import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const serverIP = 'smc.infirals.in';

    // 1. Fetch Online Players from MC Server
    const mcRes = await fetch(`https://api.mcsrvstat.us/3/${serverIP}`);
    const mcData = await mcRes.json();

    // 2. Fetch Total Registered Members from Clerk
    const client = await clerkClient();
    const totalMembers = await client.users.getCount();

    return NextResponse.json({
      online: mcData.online,
      onlinePlayers: mcData.players?.online || 0,
      totalMembers: totalMembers || 0,
    });
  } catch (error) {
    console.error('Status error:', error);
    return NextResponse.json({
      online: false,
      onlinePlayers: 0,
      totalMembers: 0,
    });
  }
}
