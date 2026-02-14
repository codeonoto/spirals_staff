import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Apne server ka IP yahan daalein (e.g., play.spiralsmc.com)
    const SERVER_IP = 'smc.infirals.in';
    const response = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`);
    const data = await response.json();

    return NextResponse.json({
      online: data.online,
      players: data.players?.online || 0,
    });
  } catch (error) {
    return NextResponse.json({ online: false, players: 0 }, { status: 500 });
  }
}
