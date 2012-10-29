{if $isFirstRow}
<ul>
{foreach $cols as $col}
	<li>{$col}</li>
{/foreach}
</ul>
{/if}
{foreach from=$data item=i}
<ul>
{foreach from=$i item=j}	<li>{$j.randomData}</li>
{/foreach}
</ul>
{/foreach}