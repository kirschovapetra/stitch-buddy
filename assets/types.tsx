export interface Project {
    row: number;
    rowsTotal: number;
    stitch: number;
    stitchesTotal: number;
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