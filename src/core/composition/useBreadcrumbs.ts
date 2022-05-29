import { ref } from "@vue/composition-api";

export default function useBreadcrumbs(items: Array<string>) {

  const breadcrumbs =ref(items.map(item => ({
    text: item,
    disabled: true,
    href: '',
  })));

  return {
    breadcrumbs,
  }
};
