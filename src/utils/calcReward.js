export const calcReward = (purchase) => {
    return (purchase > 50 && purchase < 100) ? purchase - 50 : (purchase > 100) ? ((purchase - 100) * 2) + 50 : 0;
}
