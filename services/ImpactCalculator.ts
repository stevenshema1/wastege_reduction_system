/**
 * Advanced Impact Calculator Service
 * Handles complex calculations for waste reduction impact, CO2 savings, 
 * and sustainability metrics.
 */

export enum WasteCategory {
    PLASTIC = 'plastic',
    PAPER = 'paper',
    METAL = 'metal',
    GLASS = 'glass',
    ORGANIC = 'organic',
    ELECTRONIC = 'electronic',
}

interface ImpactFactor {
    co2PerKg: number;
    waterSavedPerKg: number;
    energySavedPerKwh: number;
}

const IMPACT_FACTORS: Record<WasteCategory, ImpactFactor> = {
    [WasteCategory.PLASTIC]: { co2PerKg: 1.5, waterSavedPerKg: 2.0, energySavedPerKwh: 5.7 },
    [WasteCategory.PAPER]: { co2PerKg: 0.9, waterSavedPerKg: 26.0, energySavedPerKwh: 4.0 },
    [WasteCategory.METAL]: { co2PerKg: 3.1, waterSavedPerKg: 0.5, energySavedPerKwh: 14.0 },
    [WasteCategory.GLASS]: { co2PerKg: 0.3, waterSavedPerKg: 0.2, energySavedPerKwh: 1.2 },
    [WasteCategory.ORGANIC]: { co2PerKg: 0.5, waterSavedPerKg: 0.1, energySavedPerKwh: 0.5 },
    [WasteCategory.ELECTRONIC]: { co2PerKg: 15.0, waterSavedPerKg: 100.0, energySavedPerKwh: 50.0 },
};

export class ImpactCalculator {
    /**
     * Calculates the total environmental impact for a given set of waste records.
     */
    static calculateTotalImpact(records: Array<{ category: string; quantity: number }>) {
        let totalCO2 = 0;
        let totalWater = 0;
        let totalEnergy = 0;

        records.forEach(record => {
            const category = record.category.toLowerCase() as WasteCategory;
            const factors = IMPACT_FACTORS[category] || IMPACT_FACTORS[WasteCategory.ORGANIC];
            
            totalCO2 += record.quantity * factors.co2PerKg;
            totalWater += record.quantity * factors.waterSavedPerKg;
            totalEnergy += record.quantity * factors.energySavedPerKwh;
        });

        return {
            co2Saved: totalCO2,
            waterSaved: totalWater,
            energySaved: totalEnergy,
            treesEquivalent: Math.floor(totalCO2 / 20), // 1 tree absorbs ~20kg CO2/year
        };
    }

    /**
     * Predicts future impact based on current trends.
     */
    static predictFutureImpact(currentImpact: number, growthRate: number, months: number): number {
        return currentImpact * Math.pow(1 + growthRate, months);
    }
}
