{* generates the HTML data in table format *}
{if $firstRow}
<table cellpadding="1" cellspacing="1">
<tr>
  {foreach $sortedCols as $col}
    <th>{$col.title}</th>
  {/foreach}
</tr>
{/if}

{foreach from=$rows item=i}
<tr>
	<td>
	</td>
</tr>
{/foreach}

{if $lastRow}
</table>
{/if}