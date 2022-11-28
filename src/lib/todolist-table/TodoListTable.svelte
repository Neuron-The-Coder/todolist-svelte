<!-- Script -->
<script lang="ts">
    import { onMount } from "svelte";
    import { debug } from "svelte/internal";
    import { RetrieveTodoList, todoStore, type TodoList } from "../../services/TodoListService";
    import TodoListRow from "./TodoListRow.svelte";
    
    let todoList : TodoList[];

    todoStore.subscribe(x => { todoList = x });

</script>

<!-- Style -->
<style lang="scss">
    .numberRow { width: 5%; }
    .contentRow { width: 55%; }
    .actionRow { width: 40%; }
</style>

<!-- Template -->
<table>
    <thead>
        <tr>
            <th class="numberRow">No.</th>
            <th class="contentRow">Content</th>
            <th class="actionRow">Action</th>
        </tr>
    </thead>
    <tbody>

        { #if todoList.length > 0 }
            { #each todoList as td, idx (td.ID) }
                <TodoListRow index={idx} todoList={td}></TodoListRow>
            { /each }
        { :else }
            <tr>
                <td colspan="3">No Data</td>
            </tr>
        { /if }

    </tbody>
</table>