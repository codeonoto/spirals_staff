import { NextResponse } from 'next/server';
import { currentUser, clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // metadata check - spam prevention
    if (user.publicMetadata.hasApplied) {
      return NextResponse.json({ error: 'Already applied' }, { status: 400 });
    }

    // Destructure platform from request body
    const { ign, age, platform, writtenData, mcqData, totalScore } =
      await req.json();

    const discordAccount = user.externalAccounts.find(
      (acc) => acc.provider === 'oauth_discord',
    );
    const discordMention = discordAccount
      ? `<@${discordAccount.externalId}>`
      : 'N/A';

    // Discord Embed Construction with Platform info
    const embed = {
      title: '🛡️ NEW STAFF APPLICATION RECEIVED',
      color: 8453919, // Minecraft Green
      thumbnail: { url: user.imageUrl },
      fields: [
        {
          name: '👤 Applicant Info',
          value: `**IGN:** \`${ign}\`\n**Age:** ${age}\n**Discord:** ${discordMention}`,
          inline: true,
        },
        {
          name: '🎮 Platform',
          value: `\`${platform}\``, // New Platform field
          inline: true,
        },

        // Detailed Written Scenarios
        {
          name: '📝 Written Scenarios (Detailed)',
          value: writtenData
            .map(
              (item: any, i: number) =>
                `**Q${i + 1}: ${item.question}**\n> ${item.answer}`,
            )
            .join('\n\n')
            .slice(0, 1024),
          inline: false,
        },

        // MCQ detailed results
        {
          name: '📊 Knowledge Test (MCQs)',
          value: mcqData
            .map(
              (item: any, i: number) =>
                `**Q${i + 1}:** ${item.question}\n**Selected:** ${item.selected} ${item.isCorrect ? '✅' : '❌'}`,
            )
            .join('\n')
            .slice(0, 1024),
          inline: false,
        },
        {
          name: '🏆 Final Exam Score',
          value: `**${totalScore}/10 Correct**`,
          inline: true,
        },
      ],
      footer: { text: `User ID: ${user.id} • SpiralsMC Recruitment System` },
      timestamp: new Date().toISOString(),
    };

    const webhookRes = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!webhookRes.ok) throw new Error('Webhook failed');

    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      publicMetadata: { hasApplied: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
