import type { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Login: undefined;
  Home: { id: number; username: string; subscribed: number };
  Draw: { id: number; username: string; subscribed: number };
  Email: { image: string };
  PhotoPreview: { image: string };
  Register: undefined;
  PaymentScreen: { id: number; username: string; subscribed: number };
};

export type HomeProps = StackScreenProps<RootStackParamList, "Home">;

export type DrawProps = StackScreenProps<RootStackParamList, "Draw">;

export type EmailProps = StackScreenProps<RootStackParamList, "Email">;

export type PhotoPreviewProps = StackScreenProps<
  RootStackParamList,
  "PhotoPreview"
>;

export type PaymentScreenProps = StackScreenProps<
  RootStackParamList,
  "PaymentScreen"
>;
