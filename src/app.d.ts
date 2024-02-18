// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { UserWithoutPassword } from "$lib/types/User";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: UserWithoutPassword | undefined;
    }

    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
