//In questo file definisco tutte le interfacce dei tipi utilizate nella web-app

export interface LinkItem{
    label:string,
    destination:string,
    customClass:string
}

export interface TaskItem{
    description:string,
    isComplete:boolean
}

export interface BookItem{
    isbn:string,
    bTitle:string,
    authors:string,
    page:number,
    nobelAward:boolean

}

export enum BookItemKeys{
    B_ISBN = 'isbn',
    B_TITLE = 'bTitle',
    B_AUTHORS = 'authors',
    B_PAGE = 'page',
    B_NOBEL_AWARD = 'nobelAward'
}

