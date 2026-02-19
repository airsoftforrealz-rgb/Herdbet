import java.util.List;
import java.util.Random;

/**
 * Simple fake-money odds helper for Marshall Esports Betting.
 * This is a demo-only class that can be integrated into a Java backend later.
 */
public class ValorantOddsEngine {
    private static final Random RANDOM = new Random();

    public record TeamForm(String name, int wins, int losses) {}

    public static double generateOdds(TeamForm team, TeamForm opponent) {
        double teamRate = (double) team.wins() / Math.max(1, team.wins() + team.losses());
        double oppRate = (double) opponent.wins() / Math.max(1, opponent.wins() + opponent.losses());
        double impliedProbability = 0.5 + (teamRate - oppRate) * 0.35;
        impliedProbability = Math.max(0.2, Math.min(0.8, impliedProbability));
        return roundTwo(1.0 / impliedProbability + randomMargin());
    }

    public static String randomWinner(List<String> teams) {
        return teams.get(RANDOM.nextInt(teams.size()));
    }

    private static double randomMargin() {
        return 0.03 + RANDOM.nextDouble() * 0.08;
    }

    private static double roundTwo(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
