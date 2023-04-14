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
