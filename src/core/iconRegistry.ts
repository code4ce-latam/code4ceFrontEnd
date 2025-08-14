import { IdCard, Users, Package, Tag, Building2 } from 'lucide-react';
export const icons = {
  'id-card': IdCard,
  users: Users,
  package: Package,
  tag: Tag,
  building: Building2,
  // agrega los que necesites
} as const;

export type IconKey = keyof typeof icons;
export function getIcon(name?: string) {
  return name ? icons[name as IconKey] : undefined;
}
