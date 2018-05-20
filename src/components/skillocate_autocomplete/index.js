import React from 'react'
import ChipInput from 'material-ui-chip-input'


const SkillocateAutocomplete = ({ input, placeholder, label, margin, fullWidth }) => (
    <ChipInput
        {...input}
        value={input.value || []}
        onAdd={(addedChip) => {
            let values = input.value || []
            values = values.slice()
            values.push(addedChip)
            input.onChange(values)
        }}
        dataSourceConfig={{ value: '_id', text: 'title' }}
        onDelete={(chip) => {
            let values = input.value || []
            values = values.filter(v => v._id !== chip)
            input.onChange(values)
        }}
        onBlur={() => input.onBlur()}
        placeholder={placeholder}
        label={label}
        fullWidth={fullWidth}
        // margin={margin}
    />
)

export default SkillocateAutocomplete
