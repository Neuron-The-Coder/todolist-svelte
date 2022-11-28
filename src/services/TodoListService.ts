import { get, writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export interface TodoList {
    ID: string,
    Content: string,
    IsDone: boolean
}

const StoreTodoList = (data: TodoList[]) => {
    localStorage.setItem("TodoList", JSON.stringify(data));
    todoStore.set(data);
}

export const RetrieveTodoList = (): TodoList[] => {
    if (localStorage.getItem("TodoList") == null) return [];
    else return JSON.parse(localStorage.getItem("TodoList"));
}

export const InsertTodoList = (content : string) => {
    let data = get(todoStore);
    data.push({ ID: uuidv4(), Content: content, IsDone: false });
    StoreTodoList(data);
}

export const UpdateTodoList = (ID: string, content: string) => {
    StoreTodoList(get(todoStore).map(x => x.ID === ID ? {...x, Content: content} : x));
}

export const DeleteTodoList = (ID: string) => {
    StoreTodoList(get(todoStore).filter(x => x.ID != ID));
}

export const ToggleDone = (ID: string) => {
    StoreTodoList(get(todoStore).map(x => x.ID === ID ? {...x, IsDone: !x.IsDone} : x));
}

export const ResetTodoList = () => {
    StoreTodoList([]);
}

export const todoStore = writable(RetrieveTodoList());
