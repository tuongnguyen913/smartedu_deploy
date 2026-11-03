export interface MenuItem {
  moduleId: number;
  moduleName: string;
  moduleKey?: string;
  urlFrontEnd?: string;
  parentId?: number | null;
  displayOrder: number;
  onTopMenu: boolean;
  icon?: string | null;
  isClickable: boolean;
  targetBlank?: boolean;
  children?: MenuItem[];
}
