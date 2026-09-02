/* personal/src/scripts/skinAnimations.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

type Sv = typeof import("skinview3d");
type Player = Parameters<ConstructorParameters<Sv["FunctionAnimation"]>[0]>[0];

export type WaveArm = "left" | "right";

export function createWave(sv: Sv, arm: WaveArm = "right") {
  const RAISED = 2.7;
  const SWING = 0.22;
  const SPEED = 3;

  const dir = arm === "right" ? -1 : 1;

  return new sv.FunctionAnimation((player: Player, progress: number) => {
    const skin = player.skin;
    const target = arm === "right" ? skin.rightArm : skin.leftArm;
    const other = arm === "right" ? skin.leftArm : skin.rightArm;

    const t = progress * Math.PI * 2 * SPEED;

    target.rotation.x = 0;
    target.rotation.z = dir * (RAISED + Math.sin(t) * SWING);

    const idle = Math.sin(progress * Math.PI * 2) * 0.06;
    other.rotation.x = idle;
    other.rotation.z = dir * -0.05;
    skin.rightLeg.rotation.x = idle * 0.5;
    skin.leftLeg.rotation.x = -idle * 0.5;
    skin.head.rotation.z = dir * 0.05;
    skin.head.rotation.y = dir * -0.08;
  });
}
