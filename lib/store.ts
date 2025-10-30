import { create } from "zustand";

export type Media = {
  type: "image" | "video";
  url: string;
};

export type Publication = {
  id: number;
  description: string;
  media: Media[];
  createdAt: string;
  updatedAt: string;
  likePublics: [];
  commentPublis: { user: User }[];
  userId: number;
  open?: boolean;
  user: User;
};

export type Message = {
  read: boolean;
  rtdb: string;
  message: string;
  id: number;
  date: Date;
};

export type MessageWriting = {
  id: number;
  writing: boolean;
};

export type NotificationPublication = {
  id: string;
  type: "like" | "comment" | "reply";
  user_id: Number;
  publicacionId: Number;
  fromUser: Number;
  img: string;
  fullName: string;
  read: boolean;
  descriptionReduce?: string;
};

export type Connect = {
  id: number;
  connect: boolean;
};

export type User = {
  id: number;
  fullName: string;
  email: string;
  img: string;
  verification: boolean;
  google: boolean;
  rtdb: string[];
};

export type UserStore = {
  isLoading: boolean;
  user: User;
  setUser: (user: User) => void;
};

export const useUser = create<UserStore>((set, get) => ({
  isLoading: true,
  user: {
    id: 0,
    email: "",
    fullName: "",
    verification: false,
    google: false,
    img: "",
    rtdb: [] as string[],
  },
  setUser: (user: User) => set({ isLoading: false, user }),
}));

// export const publicacionUser = atom<Publicacion[] | null>({
//   key: "publicacionUser",
//   default: null,
// });

export type PublicationUserStore = {
  publications: Publication[];
  setPublicationUser: (newPublications: Publication[]) => void;
};

export const usePublicationUser = create<PublicationUserStore>((set) => ({
  publications: [],
  setPublicationUser: (newPublications) => set((_) => ({ publications: newPublications })),
}));

// export const getAllAmigos = atom({
//   key: "getAllAmigos",
//   default: {
//     isLoading: true,
//     data: [] as User[],
//   },
// });
export type FriendAllStore = {
  friendAll: User[];
  setFriendAll: (newAllUser: User[]) => void;
};

export const useFriendAll = create<FriendAllStore>((set) => ({
  friendAll: [],
  setFriendAll: (newAllUser) => set((_) => ({ friendAll: newAllUser })),
}));

// export const getSugerenciaAmigos = atom({
//   key: "getSugerenciaAmigos",
//   default: [] as User[],
// });

export type SeggustionUserStore = {
  suggestioonUsers: User[];
  setSuggustionUserStore: (newUsers: User[]) => void;
};

export const useSuggestionUserStore = create<SeggustionUserStore>((set) => ({
  suggestioonUsers: [],
  setSuggustionUserStore: (newUsers) => set((_) => ({ suggestioonUsers: newUsers })),
}));

// export const getAllSolicitudesRecibidas = atom({
//   key: "getAllSolicitudesRecibidas",
//   default: [] as User[],
// });
export type ReceivedUserStore = {
  receivedUsers: User[];
  setReceivedUserStore: (newUsers: User[]) => void;
};

export const useReceivedUserStore = create<ReceivedUserStore>((set) => ({
  receivedUsers: [],
  setReceivedUserStore: (newUsers) => set((_) => ({ receivedUsers: newUsers })),
}));

// export const getAllSolicitudesEnviadas = atom({
//   key: "getAllSolicitudesEnviadas",
//   default: [] as User[],
// });
export type SendUserStore = {
  senderUsers: User[];
  setSendUserStore: (newUsers: User[]) => void;
};

export const useSendUserStore = create<SendUserStore>((set) => ({
  senderUsers: [],
  setSendUserStore: (newUsers) => set((_) => ({ senderUsers: newUsers })),
}));

// export const publicacionAmigos = atom<Publicacion[] | null>({
//   key: "publicacionAmigos",
//   default: null,
// });
export type PublicationsFriendStore = {
  publication: Publication[];
  setPublicationUser: (newPublications: Publication[]) => void;
};

export const usePublicationsFriendStore = create<PublicationsFriendStore>((set) => ({
  publication: [],
  setPublicationUser: (newPublications) => set((_) => ({ publication: newPublications })),
}));

// export const publicacionSearchUser = atom<Publicacion[] | null>({
//   key: "publicacionSearchUser",
//   default: null,
// });
export type PublicationsSearchStore = {
  publication: Publication[];
  setPublicationSearch: (newPublications: Publication[]) => void;
};

export const usePublicationsSearchStore = create<PublicationsSearchStore>((set) => ({
  publication: [],
  setPublicationSearch: (newPublications) => set((_) => ({ publication: newPublications })),
}));

// export const isMenssage = atom({
//   key: "isMenssage",
//   default: [] as Message[],
// });
export type MessagesUserStore = {
  messages: Message[];
  setMessagesUser: (newMessages: Message[]) => void;
};

export const useMessagesUserStore = create<MessagesUserStore>((set, get) => ({
  messages: [],
  setMessagesUser: (newMessages) => set((_) => ({ messages: [...get().messages, ...newMessages] })),
}));

// export const messagesWriting = atom({
//   key: "isMenssageWriting",
//   default: [] as MessageWriting[],
// });
export type MessageWritingStore = {
  messagesWriting: MessageWriting[];
  setMessagesWritingUser: (newMessages: MessageWriting[]) => void;
};

export const useMessageWritingStore = create<MessageWritingStore>((set) => ({
  messagesWriting: [],
  setMessagesWritingUser: (newMessages) => set((_) => ({ messagesWriting: newMessages })),
}));

// export const notificacionesUser = atom<{
//   publicacion: NotificationPublication[];
//   newPubliOPen: number;
//   limit: number;
//   isLoading: boolean;
// }>({
//   key: "notificacionesUser",
//   default: {
//     publicacion: [],
//     newPubliOPen: 0,
//     limit: 10,
//     isLoading: true,
//   },
// });
export type NotificationUser = {
  notificationUser: {
    publications: NotificationPublication[];
    newPubliOpen: number;
    limit: number;
    isLoading: boolean;
  };
  setNotificationUser: (newNotificationUser: Partial<NotificationUser["notificationUser"]>) => void;
};

export const useNotificationUser = create<NotificationUser>((set) => ({
  notificationUser: {
    publications: [],
    newPubliOpen: 0,
    limit: 10,
    isLoading: true,
  },
  setNotificationUser: (newNotificationUser) =>
    set((state) => ({
      notificationUser: {
        ...state.notificationUser,
        ...newNotificationUser,
      },
    })),
}));

export type IsConnected = {
  connected: Connect[];
  setIsConnected: (connect: Connect[]) => void;
};

export const useIsConnected = create<IsConnected>((set) => ({
  connected: [],
  setIsConnected: (newConnected) => set({ connected: newConnected }),
}));

export const useOpenChatUser = create<{
  value: string;
  setChatUser: (newChatUser: string) => void;
}>((set) => ({
  value: "",
  setChatUser: (newChatUser: string) => set({ value: newChatUser }),
}));
