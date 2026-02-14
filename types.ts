export type ViewState = 'landing' | 'form';

export interface ApplicationFormData {
  scenario1: string;
  scenario2: string;
  scenario3: string;
  isReady: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}
