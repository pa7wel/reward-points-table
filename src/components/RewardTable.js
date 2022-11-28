import {useTransactions} from "../hooks/useTransactions";
import {calcReward} from "../utils/calcReward";

export const RewardTable = () => {
    const {transactions, loading} = useTransactions();
    const transactionsWithPoints = transactions.map(el => {
        const point = calcReward(el.purchase);
        const dataObj = new Date(el.date);
        return {...el, point, dataObj}
    })
    const uniqueCustomersArray = [...new Set(transactionsWithPoints?.map(el => el.customerId))]
    const pointsPerUser = uniqueCustomersArray.map(customerId => {
        const filterCustomer = transactionsWithPoints.filter(el => customerId === el.customerId);
        const sumPerMonth = filterCustomer
            .filter(el => el.dataObj.getMonth() === 10)
            .reduce((accum, item) => accum + item.point, 0);
        const sumPer3Months = filterCustomer.reduce((accum, item) => accum + item.point, 0);

        return {customerId, sumPerMonth, sumPer3Month: sumPer3Months}
    })

    return (
        loading ?
            <div className="flex items-center justify-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> :
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="border-b">
                                <tr className="border-b">
                                    <th scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Customer ID
                                    </th>
                                    <th scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Total points - 1 month
                                    </th>
                                    <th scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Total points - 3 months
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    pointsPerUser?.map((el) =>
                                        <tr className="border-b" key={el.customerId}>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {el.customerId}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {el.sumPerMonth}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {el.sumPer3Month}
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    )
}