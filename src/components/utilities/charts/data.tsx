export function generateRandomData(num: number, tiers: string[]) {
  const data = [];

  for (let i = 0; i < num; i++) {
    const randomDataPoint: Record<string, number | string> = {
      name: String.fromCharCode(97 + i), // ASCII code for 'a' is 97
    };

    tiers.forEach((tier) => {
      // Generate random values for tier1 to tier5
      randomDataPoint[tier] = Math.floor(Math.random() * 5000) + 1000;
    });

    data.push(randomDataPoint);
  }

  return data;
}
