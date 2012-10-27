{if $isFirstRow}<table cellpadding="1" cellspacing="1">
<tr>
{foreach $cols as $col}
	<th>{$col}</th>
{/foreach}
</tr>
{/if}
{foreach from=$data item=i}
<tr>
{foreach from=$i item=j}	<td>{$j.randomData}</td>
{/foreach}
</tr>
{/foreach}

{if $isLastRow}</table>{/if}