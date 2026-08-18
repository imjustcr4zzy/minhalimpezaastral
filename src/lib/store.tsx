import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Profile = {
  name: string;
  email: string;
  birthDate: string;
  birthTime: string;
  birthCity: string;
};

export type Progress = {
  practices: number;
  minutes: number;
  rituals: number;
  contents: number;
  streak: number;
  completed: string[];
};

type Account = { profile: Profile; password: string };

type State = {
  session: string | null;
  accounts: Record<string, Account>;
  progress: Record<string, Progress>;
  favorites: Record<string, string[]>;
};

const KEY = "limpeza-astral:v1";

const emptyProgress: Progress = {
  practices: 12,
  minutes: 42,
  rituals: 4,
  contents: 18,
  streak: 7,
  completed: [],
};

const initialState: State = { session: null, accounts: {}, progress: {}, favorites: {} };

function read(): State {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return initialState;
    return { ...initialState, ...(JSON.parse(raw) as State) };
  } catch {
    return initialState;
  }
}

type Store = {
  ready: boolean;
  profile: Profile | null;
  progress: Progress;
  favorites: string[];
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signUp: (
    name: string,
    email: string,
    password: string,
    confirm: string,
  ) => { ok: boolean; error?: string };
  signOut: () => void;
  updateProfile: (patch: Partial<Profile>) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  completePractice: (id: string, minutes: number, kind: string) => void;
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(read());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state, ready]);

  const email = state.session;
  const profile = email ? state.accounts[email]?.profile ?? null : null;
  const progress = (email && state.progress[email]) || emptyProgress;
  const favorites = (email && state.favorites[email]) || [];

  const signIn = useCallback<Store["signIn"]>((rawEmail, password) => {
    const id = rawEmail.trim().toLowerCase();
    let result: { ok: boolean; error?: string } = { ok: true };
    setState((prev) => {
      const account = prev.accounts[id];
      if (!account) {
        // primeiro acesso: cria a conta automaticamente para não travar a experiência
        const name = id.split("@")[0] ?? "Viajante";
        return {
          ...prev,
          session: id,
          accounts: {
            ...prev.accounts,
            [id]: {
              password,
              profile: {
                name: name.charAt(0).toUpperCase() + name.slice(1),
                email: id,
                birthDate: "",
                birthTime: "",
                birthCity: "",
              },
            },
          },
          progress: { ...prev.progress, [id]: prev.progress[id] ?? emptyProgress },
        };
      }
      if (account.password !== password) {
        result = { ok: false, error: "Senha incorreta." };
        return prev;
      }
      return { ...prev, session: id };
    });
    return result;
  }, []);

  const signUp = useCallback<Store["signUp"]>((name, rawEmail, password, confirm) => {
    const id = rawEmail.trim().toLowerCase();
    if (!name.trim()) return { ok: false, error: "Informe seu nome." };
    if (!id.includes("@")) return { ok: false, error: "Informe um e-mail válido." };
    if (password.length < 6) return { ok: false, error: "A senha precisa de ao menos 6 caracteres." };
    if (password !== confirm) return { ok: false, error: "As senhas não coincidem." };

    setState((prev) => ({
      ...prev,
      session: id,
      accounts: {
        ...prev.accounts,
        [id]: {
          password,
          profile: {
            name: name.trim(),
            email: id,
            birthDate: "",
            birthTime: "",
            birthCity: "",
          },
        },
      },
      progress: { ...prev.progress, [id]: prev.progress[id] ?? emptyProgress },
    }));
    return { ok: true };
  }, []);

  const signOut = useCallback(() => {
    setState((prev) => ({ ...prev, session: null }));
  }, []);

  const updateProfile = useCallback<Store["updateProfile"]>((patch) => {
    setState((prev) => {
      const id = prev.session;
      if (!id) return prev;
      const account = prev.accounts[id];
      if (!account) return prev;
      return {
        ...prev,
        accounts: {
          ...prev.accounts,
          [id]: { ...account, profile: { ...account.profile, ...patch } },
        },
      };
    });
  }, []);

  const toggleFavorite = useCallback<Store["toggleFavorite"]>((contentId) => {
    setState((prev) => {
      const id = prev.session;
      if (!id) return prev;
      const current = prev.favorites[id] ?? [];
      const next = current.includes(contentId)
        ? current.filter((f) => f !== contentId)
        : [...current, contentId];
      return { ...prev, favorites: { ...prev.favorites, [id]: next } };
    });
  }, []);

  const completePractice = useCallback<Store["completePractice"]>((contentId, minutes, kind) => {
    setState((prev) => {
      const id = prev.session;
      if (!id) return prev;
      const current = prev.progress[id] ?? emptyProgress;
      if (current.completed.includes(contentId)) return prev;
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [id]: {
            ...current,
            practices: current.practices + 1,
            minutes: current.minutes + minutes,
            rituals: kind === "ritual" ? current.rituals + 1 : current.rituals,
            contents: current.contents + 1,
            completed: [...current.completed, contentId],
          },
        },
      };
    });
  }, []);

  const value = useMemo<Store>(
    () => ({
      ready,
      profile,
      progress,
      favorites,
      signIn,
      signUp,
      signOut,
      updateProfile,
      toggleFavorite,
      isFavorite: (id: string) => favorites.includes(id),
      completePractice,
    }),
    [
      ready,
      profile,
      progress,
      favorites,
      signIn,
      signUp,
      signOut,
      updateProfile,
      completePractice,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore precisa estar dentro de StoreProvider");
  return ctx;
}

export function progressPercent(p: Progress) {
  const base = 68 + p.completed.length * 2;
  return Math.min(100, base);
}

export function greeting(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}
