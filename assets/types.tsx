export interface Project {
    row: number;
    rowsTotal: number;
    stitch: number;
    stitchesTotal: number;
}

export interface ProjectForm extends Project {
    title:string
}

export type ItemProps = {
    project: string
}

export type ProjectMetadata = {
    id: string;
    name: string;
    createdAt: any;
    updatedAt: any;
};

export enum SORT_DIRECTION {
    ASC = "A to Z",
    DESC = "Z to A",
}

export enum SORT_BY {
    NAME = "Name",
    CREATED = "Date Created",
    UPDATED = "Date Modified",
}