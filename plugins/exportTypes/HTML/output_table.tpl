{* generates the HTML data in table format *}
{if $isFirstRow}
<table cellpadding="1" cellspacing="1">
<tr>
  {foreach $cols as $col}
    <th>{$col.title}</th>
  {/foreach}
</tr>
{/if}

{*
{foreach from=$rows item=i}
<tr>
	<td>
	</td>
</tr>
{/foreach}
*}

{if $isLastRow}
</table>
{/if}