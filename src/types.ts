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

export interface RegionItem{
    name:string,
    population:number
}

export enum BookItemKeys{
    B_ISBN = 'isbn',
    B_TITLE = 'bTitle',
    B_AUTHORS = 'authors',
    B_PAGE = 'page',
    B_NOBEL_AWARD = 'nobelAward'
}

export enum RegionItemKeys{
    R_NAME = 'name',
    R_POPULATION='population'
}


export enum TitleStyle{
    CLASSIC_SMALLEST="classic-smallest-title",
    CLASSIC_SMALL="classic-small-title",
    CLASSIC_MEDIUM="classic-medium-title",
    CLASSIC_BIG = "classic-big-title",
    CLASSIC_BIGGEST = "classic-biggest-title",
    LIGHT_SMALLEST="light-smallest-title",
    LIGHT_SMALL="light-small-title",
    LIGHT_MEDIUM="light-medium-title",
    LIGHT_BIG = "light-big-title",
    LIGHT_BIGGEST = "light-biggest-title",
    DARK_SMALLEST="dark-smallest-title",
    DARK_SMALL="dark-small-title",
    DARK_MEDIUM="dark-medium-title",
    DARK_BIG = "dark-big-title",
    DARK_BIGGEST = "dark-biggest-title",
}
