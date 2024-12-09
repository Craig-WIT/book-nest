import { type SupabaseClient, type User, type Session } from "@supabase/supabase-js";
import { redirect } from "@sveltejs/kit";
import { setContext, getContext } from "svelte";

interface UserStateProps {
    session: Session | null;
    supabase: SupabaseClient | null;
    user: User | null;
}

export class UserState {
    session = $state<Session | null>(null);
    supabase = $state<SupabaseClient | null>(null);
    user = $state<User | null>(null);

    constructor(data:UserStateProps) {
        this.updateState(data) 
    }

    updateState(data:UserStateProps) {
        this.session = data.session;
        this.supabase = data.supabase;
        this.user = data.user;
    }

    async logout() {
        await this.supabase?.auth.signOut();
    }
}

const USER_STATE_KEY = Symbol("USER_STATE");

export function setUserState(data: UserStateProps) {
    return setContext(USER_STATE_KEY, new UserState(data))
}

export function getUserState() {
    return getContext<ReturnType<typeof setUserState>>(USER_STATE_KEY)
}