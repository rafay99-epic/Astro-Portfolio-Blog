import { timingSafeEqual } from "crypto";
import { Buffer } from "buffer";

export function secureCompare(a: string, b: string): boolean {
  if (!a || !b) return false;

  try {
    const bufA = Buffer.from(a, "utf-8");
    const bufB = Buffer.from(b, "utf-8");

    if (bufA.length !== bufB.length) {
      return false;
    }

    return timingSafeEqual(
      new Uint8Array(bufA.buffer, bufA.byteOffset, bufA.byteLength),
      new Uint8Array(bufB.buffer, bufB.byteOffset, bufB.byteLength)
    );
  } catch {
    return false;
  }
}
