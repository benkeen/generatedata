<?php


// ------------------------------------------------------------------------------------------------
// EXAMPLES

$data_type_example_html =<<<EOF
  <select name="dt_\$ROW\$" id="dt_\$ROW\$" onchange="return AutoIncrement_ns.selectExample(this.value, \$ROW\$)">
    <option value="1,1,">1, 2, 3, 4, 5, 6...</option>
    <option value="100,1,">100, 101, 102, 103, 104...</option>
    <option value="0,2,">0, 2, 4, 6, 8, 10...</option>
    <option value="0,5,">0, 5, 10, 15, 20, 25...</option>
    <option value="1000,-1,">1000, 999, 998, 997...</option>
    <option value="0,-1,">0, -1, -2, -3, -4...</option>
    <option value="0,0.5,">0, 0.5, 1, 1.5, 2...</option>
    <option value="1,1,ROW-{ROW}">ROW-1, ROW-2, ROW-3,...</option>
    <option value="2,4,{ROW}i">2i, 4i, 6i, 8i...</option>
  </select>
EOF;
