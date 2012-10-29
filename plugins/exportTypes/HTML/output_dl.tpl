{foreach from=$data item=i}
<dl>
{foreach from=$i item=j name=loop}
{assign var=index value=$smarty.foreach.loop.index}
	<dt>{$cols[$index]}</dt>
		<dd>{$j.randomData}</dd>
{/foreach}
</dl>
{/foreach}