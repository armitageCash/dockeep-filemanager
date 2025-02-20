export interface authResponse {
  data: {
    access_token: string;
    expires: number;
    refresh_token: string;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      avatar: string | null;
      description: string | null;
      location: string | null;
      title: string | null;
      role: {
        id: string;
        name: string;
        icon: string;
        description: string | null;
        admin_access: boolean;
        app_access: boolean;
      };
      status: string;
      last_access: string;
      last_page: string;
      provider: string;
      external_identifier: string | null;
      auth_data: Record<string, any> | null;
      email_notifications: boolean;
      language: string;
      theme: 'light' | 'dark' | 'auto';
      tfa_secret: string | null;
      token: string | null;
    };
  };
}
export type FormAuth = {
  email: string;
  password: string;
  remenber: boolean;
};
