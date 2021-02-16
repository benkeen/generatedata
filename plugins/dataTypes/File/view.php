/* @var DataType_File $this */
<div>
    <label for="dtPath_%ROW%"><?=$this->L["path"]?></label>
    <input type="text" name="dtPath_%ROW%" id="dtPath_%ROW%" value="uploads/">
</div>
<div>
    <label for="dtExtensions_%ROW%"><?=$this->L["extensions"]?></label>
    <input type="text" name="dtExtensions_%ROW%" id="dtExtensions_%ROW%" value="jpg,png">
</div>
<div>
     <label for="dtLengthMin_%ROW%"><?=$this->L["length from"]?></label>
    <input type="number" name="dtLengthMin_%ROW%" id="dtLengthMin_%ROW%" value="10" max="<?=(DataType_File::MAX_FILE_LENGTH - 5)?>" min="2" step="1" size="4">
     <label for="dtLengthMax_%ROW%"><?=$this->L["to"]?></label>
    <input type="number" name="dtLengthMax_%ROW%" id="dtLengthMax_%ROW%" value="15" max="<?=(DataType_File::MAX_FILE_LENGTH - 5)?>" min="3" step="1" size="4">
    <?=$this->L["symbols"]?>
</div>