type MenuItem = {
  title: string;
  url: string;
  icon?: any;
  children?: MenuItem[];
};

export function findBreadcrumbPath(items: MenuItem[], pathname: string): MenuItem[] {
  const stack: MenuItem[] = [];

  const dfs = (nodes: MenuItem[], path: string[]): boolean => {
    for (const node of nodes) {
      stack.push(node);
      if (node.url === pathname) return true;
      if (node.children && dfs(node.children, path)) return true;
      stack.pop();
    }
    return false;
  };

  dfs(items, []);
  return stack;
}
