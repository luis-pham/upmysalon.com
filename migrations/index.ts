import * as migration_20260718_032018 from './20260718_032018';

export const migrations = [
  {
    up: migration_20260718_032018.up,
    down: migration_20260718_032018.down,
    name: '20260718_032018'
  },
];
