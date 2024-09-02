export type InputSearchDto = {
    search?: string;
    by?: string;
};

export type TSearchState = InputSearchDto & {
    name: string;
    reload: number;
};
