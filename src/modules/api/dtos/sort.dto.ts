export enum SortType {
  asc = "asc",
  desc = "desc",
}

export type SortDto<Entity> = {
  [P in keyof Entity]?: SortType | { readonly [key: string]: SortType };
};
