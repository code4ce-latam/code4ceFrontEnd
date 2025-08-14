import contactos from '../modules/contactos/config/module.config.jsx';
import clientes from '../modules/clientes/config/module.config.jsx'; // 👈 nuevo

const modules = [contactos, clientes];

export const getRoutes = () => {
  return modules.flatMap((mod) => mod.menu);
};

export const getSidebarItems = () => {
  return modules.map((mod) => ({
    label: mod.name,
    icon: mod.icon,
    items: mod.menu.map((item) => ({
      label: item.label,
      path: item.path,
    })),
  }));
};
