import { NextResponse } from 'next/server';
import { currentUser, clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // 1. Ek baar check karo user ne pehle toh apply nahi kiya
    if (user.publicMetadata.hasApplied) {
      return NextResponse.json({ error: 'Already applied' }, { status: 400 });
    }

    const body = await req.json();

    // Discord details nikaalo
    const discordAccount = user.externalAccounts.find(
      (acc) => acc.provider === 'oauth_discord',
    );
    const discordTag = discordAccount?.username || user.username || 'Unknown';
    const discordId = discordAccount?.externalId || 'N/A';

    // 2. Discord Webhook Content
    const embed = {
      title: '🛡️ NEW STAFF APPLICATION',
      color: 16102144, // Amber/Gold color
      thumbnail: { url: user.imageUrl },
      fields: [
        { name: 'Minecraft IGN', value: `\`${body.ign}\``, inline: true },
        { name: 'Age', value: body.age, inline: true },
        {
          name: 'Discord Account',
          value: `<@${discordId}> (${discordTag})`,
          inline: false,
        },
        { name: 'Reason', value: body.reason },
        { name: 'Scenario Action', value: body.scenario },
      ],
      footer: { text: 'SpiralsMC • Recruitment System' },
      timestamp: new Date().toISOString(),
    };

    const webhookRes = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!webhookRes.ok) throw new Error('Webhook failed');

    // 3. User Metadata update karo (One-time apply limit)
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
