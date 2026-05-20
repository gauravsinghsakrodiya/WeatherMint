export function getTemperatureLine(temp) {

    if (temp <= -50) {
        return "Extreme survival conditions. Frostbite can occur within minutes.";
    }

    else if (temp <= -20) {
        return "Dangerously cold weather. Heavy winter protection is essential.";
    }

    else if (temp <= 0) {
        return "Freezing temperatures with icy atmospheric conditions.";
    }

    else if (temp <= 10) {
        return "Cold weather with a crisp and chilly atmosphere.";
    }

    else if (temp <= 20) {
        return "Cool and comfortable temperatures across the region.";
    }

    else if (temp <= 30) {
        return "Pleasant weather with balanced atmospheric conditions.";
    }

    else if (temp <= 40) {
        return "Rising heat levels detected above average seasonal temperature.";
    }

    else if (temp <= 45) {
        return "Higher than average global temperatures are currently affecting this region.";
    }

    else if (temp <= 50) {
        return "Extreme heat conditions detected. Outdoor exposure should be limited.";
    }

    else {
        return "Critical temperature anomaly detected beyond normal climate patterns.";
    }
}
