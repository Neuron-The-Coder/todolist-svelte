<!-- Script -->
<script lang="ts">
    import { DeleteTodoList, ToggleDone, UpdateTodoList, type TodoList } from "../../services/TodoListService";

    export let index : number;
    export let todoList! : TodoList; 
    let editContent = todoList.Content;

    let isEditMode = false;

    const toggleEditMode = (isEdit : boolean) => { isEditMode = isEdit; }
    const updateTodoList = () => { UpdateTodoList(todoList.ID, editContent); isEditMode = false; }
    const toggleDone = () => { ToggleDone(todoList.ID); }
    const deleteTodoList = () => { DeleteTodoList(todoList.ID); }

</script>

<!-- Style -->
<style lang="scss">
    .actions .read-mode,
    .actions .edit-mode {
        display: flex;
        justify-content: center;
        gap: .5rem;
    }
</style>

<!-- Template -->
<tr class={"todolist-row" + (todoList.IsDone ? ' done' : '')}>
    <td>{ index + 1 }</td>
    <td>
        { #if isEditMode }
            <div class="edit-mode">
                <input type="text" name="" id="" bind:value={editContent}>
            </div>
        { :else }
            <div class="read-mode">{ todoList.Content }</div>
        { /if }
    </td>
    <td class="actions">
        { #if isEditMode }
            <div class="edit-mode">
                <button class="button button-primary" on:click|preventDefault={ updateTodoList } >Update</button>
                <button class="button button-danger" on:click|preventDefault={ () => { toggleEditMode(false); } }>Cancel</button>
            </div>
            
        { :else }
            <div class="read-mode">
                { #if todoList.IsDone }
                    <button class="button button-danger" on:click|preventDefault={ toggleDone }>Toggle Not Done</button>    
                { :else }
                    <button class="button button-success" on:click|preventDefault={ toggleDone }>Toggle Done</button>
                {/if }
                <button class="button button-primary" on:click|preventDefault={ () => { toggleEditMode(true); } }>Update</button>
                <button class="button button-danger" on:click|preventDefault={ deleteTodoList }>Delete</button>
            </div>
        { /if }
    </td>
</tr>