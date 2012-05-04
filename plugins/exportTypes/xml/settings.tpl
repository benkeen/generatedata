            <table cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td width="30%" valign="top">
                <table cellspacing="0" cellpadding="0">
                <tr>
                  <td width="160"><label for="xml_root_node_name"><?php echo $L["root_node_name"]?></label></td>
                  <td>
          <input type="text" size="10" name="xml_root_node_name" id="xml_root_node_name" value="records" />
                  </td>
                </tr>
                <tr>
                  <td><label for="xml_record_node_name"><?php echo $L["record_node_name"]?></label></td>
                  <td>
          <input type="text" size="10" name="xml_record_node_name" id="xml_record_node_name" value="record" />
                  </td>
                </tr>
                </table>
              </td>
              <td width="70%" valign="top">
                <label for="xml_use_custom_format">
                  <input type="checkbox" name="xml_use_custom_format" id="xml_use_custom_format" />
                  <?php echo $L["use_custom_xml_format"]?>
                </label>
        <textarea style="width: 98%; height: 70px" class="disabled" name="xml_custom_format" id="xml_custom_format" disabled>&lt;?xml version="1.0" encoding="UTF-8" ?&gt;
&lt;records&gt;
  {records}
    &lt;record&gt;
      &lt;row1&gt;{ROW1}&lt;/row1&gt;
      &lt;row2&gt;{ROW2}&lt;/row2&gt;
    &lt;/record&gt;
  {/records}
&lt;/records&gt;</textarea>
              </td>
            </tr>
            </table>
