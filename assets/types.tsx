import React from "react";
import {Control, FieldError} from "react-hook-form";
export interface Project {
    row: number;
    rowsTotal: number;
    stitch: number;
    stitchesTotal: number;
}
export interface ProjectForm extends Project {
    title:string
}
export type CountBlockProps = {
    title:string,
    count:number,
    countTotal:number,
    setCount: React.Dispatch<React.SetStateAction<number>>,
    setCountTotal:React.Dispatch<React.SetStateAction<number>>
}
export type DeletionDialogProps = {
    visible:boolean,
    confirm:any,
    item?:ProjectMetadata,
    dismissDialog:any
}
export type NumericTextInputProps = {
    value?:number,
    label?:string,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    errorValue?: FieldError,
    style?:any,
    onBlur?:any
}
export type SortingMenuProps = {
    sortMetadata:Function,
    sortBy:SORT_BY,
    setSortBy:React.Dispatch<React.SetStateAction<SORT_BY>>,
    sortDirection:SORT_DIRECTION,
    setSortDirection:React.Dispatch<React.SetStateAction<SORT_DIRECTION>>,
}
export interface NumericTextInputFormWrapperProps extends NumericTextInputProps {
    control?: Control<any, any, any>,
    name:string,
    customValidation?:any
}
export type ProjectListItemProps = {
    item:ProjectMetadata,
    showDeletionDialog:Function,
    setMetadata:React.Dispatch<React.SetStateAction<ProjectMetadata[]>>
}
export type ProjectMetadata = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

export type ThemeProps = {
    title?:string;
    projectId?:string;
    setTheme:any,
    backAllowed?:boolean,
    customComponents?:any,
}
export enum SORT_DIRECTION {
    ASC = "A to Z",
    DESC = "Z to A",
}

export enum SORT_BY {
    NAME = "Name",
    CREATED = "Date Created",
    UPDATED = "Date Modified",
}

export enum THEME {
    LIGHT = "light",
    DARK = "dark",
    DEFAULT = "default",
}

export const BUTTON_MODE = "contained";
export const TEXTINPUT_MODE = "outlined";