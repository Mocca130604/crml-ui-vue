export interface ApiProp {
  prop: string
  type: string
  default: string
  desc: string
}

export interface ApiSlot {
  slot: string
  bindings: string
  desc: string
}

export interface ApiEvent {
  event: string
  payload: string
  desc: string
}

export interface CatalogItem {
  id: string
  name: string
  category: string
  type: string
  desc: string
  icon: string
  badge?: string
  designNotes?: string
  apiData: ApiProp[]
  slotsData?: ApiSlot[]
  eventsData?: ApiEvent[]
}

export interface CatalogCategory {
  name: string
  items: CatalogItem[]
}

export const CATALOG_DATA: CatalogCategory[] = [
  {
    "name": "FORM & INPUT SUITE",
    "items": [
      {
        "id": "CrmlDatePicker",
        "name": "CrmlDatePicker",
        "category": "Form Suite",
        "type": "Date Picker",
        "desc": "Tactile calendar date picker with Month/Year quick selector grid, individual date clicking, and Range Mode selection support.",
        "icon": "📅",
        "badge": "RANGE & MONTH GRID ✦",
        "designNotes": "Built with 2.5px solid ink border (#0D0D0D), solid 3px drop-shadow, and zero ambient blur. Active date selections pop with Electric Lime (#CCFF00) and Cyber Cyan (#00F0FF).",
        "apiData": [
          {
            "prop": "v-model",
            "type": "string | [string, string]",
            "default": "'2026-09-12'",
            "desc": "Selected date string or tuple range array [startDate, endDate]"
          },
          {
            "prop": "mode",
            "type": "'single' | 'range'",
            "default": "'single'",
            "desc": "Single date selection or range selection mode"
          },
          {
            "prop": "label",
            "type": "string",
            "default": "'TACTILE DATE PICKER'",
            "desc": "Header title text displayed above calendar"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Accent color theme variant for selection highlight"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "default": "false",
            "desc": "Disables calendar interaction"
          },
          {
            "prop": "format",
            "type": "string",
            "default": "'YYYY-MM-DD'",
            "desc": "Date string formatting pattern"
          },
          {
            "prop": "minDate",
            "type": "string",
            "default": "undefined",
            "desc": "Earliest selectable date boundary"
          },
          {
            "prop": "maxDate",
            "type": "string",
            "default": "undefined",
            "desc": "Latest selectable date boundary"
          }
        ],
        "slotsData": [
          {
            "slot": "header",
            "bindings": "{ date, mode }",
            "desc": "Custom header title bar or month navigation actions"
          },
          {
            "slot": "date",
            "bindings": "{ date, isSelected, isInRange, isToday }",
            "desc": "Custom day cell rendering"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "string | [string, string]",
            "desc": "Triggered when user picks a date or completes a range"
          },
          {
            "event": "change",
            "payload": "string | [string, string]",
            "desc": "Triggered on calendar popup close or confirmed selection"
          }
        ]
      },
      {
        "id": "CrmlTimePicker",
        "name": "CrmlTimePicker",
        "category": "Form Suite",
        "type": "Time Picker",
        "desc": "Neubrutalist time spinner with 12H/24H format switcher, hour/minute input boxes, and quick-preset selection pills.",
        "icon": "⏰",
        "badge": "12H / 24H ✦",
        "designNotes": "Features solid 2.5px ink stroke, arcade button physics on hour/minute step buttons, and zero ambient drop blur.",
        "apiData": [
          {
            "prop": "v-model",
            "type": "string",
            "default": "'09:30 AM'",
            "desc": "Time string output (\"09:30 AM\" or \"14:30\")"
          },
          {
            "prop": "format",
            "type": "'12h' | '24h'",
            "default": "'12h'",
            "desc": "12-hour AM/PM or 24-hour military clock format"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'white'",
            "default": "'lime'",
            "desc": "Color theme variant"
          },
          {
            "prop": "label",
            "type": "string",
            "default": "'SELECT TIME'",
            "desc": "Header title text"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "default": "false",
            "desc": "Disables time interaction"
          }
        ],
        "slotsData": [
          {
            "slot": "label",
            "bindings": "{ label }",
            "desc": "Custom header label rendering"
          },
          {
            "slot": "presets",
            "bindings": "{ selectPreset }",
            "desc": "Custom quick-time preset buttons"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "string",
            "desc": "Triggered when time value is adjusted"
          }
        ]
      },
      {
        "id": "CrmlNumberInput",
        "name": "CrmlNumberInput",
        "category": "Form Suite",
        "type": "Number Spinner",
        "desc": "Tactile numeric stepper with mechanical arcade [-] and [+] step buttons, min/max limits, and hideable unit badge.",
        "icon": "🔢",
        "badge": "CUSTOM UNIT ✦",
        "designNotes": "3px solid ink border, 3px solid black drop shadow. Buttons compress 2px on active press.",
        "apiData": [
          {
            "prop": "v-model",
            "type": "number",
            "default": "1",
            "desc": "Current numeric value"
          },
          {
            "prop": "min",
            "type": "number",
            "default": "0",
            "desc": "Minimum allowed value boundary"
          },
          {
            "prop": "max",
            "type": "number",
            "default": "999",
            "desc": "Maximum allowed value boundary"
          },
          {
            "prop": "step",
            "type": "number",
            "default": "1",
            "desc": "Increment/decrement step delta"
          },
          {
            "prop": "unit",
            "type": "string",
            "default": "''",
            "desc": "Unit badge text (e.g. QTY, PCS). Empty string hides badge."
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Color theme variant"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "default": "false",
            "desc": "Disables stepper buttons and input"
          }
        ],
        "slotsData": [
          {
            "slot": "prefix",
            "bindings": "-",
            "desc": "Optional prefix symbol (e.g. $, #)"
          },
          {
            "slot": "unit",
            "bindings": "{ unit }",
            "desc": "Custom unit badge"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "number",
            "desc": "Triggered on value change"
          },
          {
            "event": "change",
            "payload": "number",
            "desc": "Triggered on input blur or step button release"
          }
        ]
      },
      {
        "id": "CrmlInput",
        "name": "CrmlInput",
        "category": "Form Suite",
        "type": "Text Input",
        "desc": "Chunky single-line text input with overlapping label tag, left/right icon slots, clear button, and neon focus ring.",
        "icon": "🔤",
        "designNotes": "2.5px solid ink border with 3px solid drop shadow. Focus state highlights with Cyber Cyan or Electric Lime.",
        "apiData": [
          {
            "prop": "v-model",
            "type": "string | number",
            "default": "''",
            "desc": "Input text value binding"
          },
          {
            "prop": "label",
            "type": "string",
            "default": "''",
            "desc": "Overlapping label header text"
          },
          {
            "prop": "placeholder",
            "type": "string",
            "default": "''",
            "desc": "Placeholder string"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'white'",
            "default": "'lime'",
            "desc": "Input border and focus variant"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Input size dimensions"
          },
          {
            "prop": "clearable",
            "type": "boolean",
            "default": "false",
            "desc": "Shows quick clear [✕] button when input has value"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "default": "false",
            "desc": "Disables input"
          },
          {
            "prop": "error",
            "type": "string",
            "default": "''",
            "desc": "Error message text displayed below input"
          },
          {
            "prop": "helperText",
            "type": "string",
            "default": "''",
            "desc": "Helpful caption text below input"
          }
        ],
        "slotsData": [
          {
            "slot": "prefix",
            "bindings": "-",
            "desc": "Prefix icon or currency symbol inside input box"
          },
          {
            "slot": "suffix",
            "bindings": "-",
            "desc": "Suffix icon or unit text"
          },
          {
            "slot": "iconLeft",
            "bindings": "-",
            "desc": "Left decorative icon"
          },
          {
            "slot": "iconRight",
            "bindings": "-",
            "desc": "Right decorative icon"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "string",
            "desc": "Triggered on keystroke"
          },
          {
            "event": "clear",
            "payload": "void",
            "desc": "Triggered when clear button is clicked"
          }
        ]
      },
      {
        "id": "CrmlTextarea",
        "name": "CrmlTextarea",
        "category": "Form Suite",
        "type": "Textarea",
        "desc": "Multi-line textarea field with live character counter, resize control, and hard ink border.",
        "icon": "📄",
        "designNotes": "Solid ink border 2.5px, 3px solid black offset shadow, zero soft drop blur.",
        "apiData": [
          {
            "prop": "v-model",
            "type": "string",
            "default": "''",
            "desc": "Textarea content string"
          },
          {
            "prop": "label",
            "type": "string",
            "default": "''",
            "desc": "Field title label"
          },
          {
            "prop": "placeholder",
            "type": "string",
            "default": "''",
            "desc": "Placeholder text"
          },
          {
            "prop": "maxlength",
            "type": "number",
            "default": "120",
            "desc": "Character limit boundary"
          },
          {
            "prop": "rows",
            "type": "number",
            "default": "4",
            "desc": "Initial row height"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Focus highlight color"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "default": "false",
            "desc": "Disables textarea"
          }
        ],
        "slotsData": [
          {
            "slot": "label",
            "bindings": "-",
            "desc": "Custom header label"
          },
          {
            "slot": "footer",
            "bindings": "{ length, maxlength }",
            "desc": "Custom footer or character counter"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "string",
            "desc": "Triggered on content edit"
          }
        ]
      },
      {
        "id": "CrmlDualRangeSlider",
        "name": "CrmlDualRangeSlider",
        "category": "Form Suite",
        "type": "Range Filter",
        "desc": "Dual-thumb knurled range slider with custom min/max limits, compact K/M/B abbreviations, thousand separators, and scoped slots.",
        "icon": "🎛️",
        "badge": "COMPACT K/M/B ✦",
        "designNotes": "3px solid ink stroke, solid black slider track with 0% ambient blur. Active highlight fills with brand token colors.",
        "apiData": [
          {
            "prop": "v-model:min / v-model:max",
            "type": "number",
            "default": "150 / 800",
            "desc": "Min and Max range thumb values"
          },
          {
            "prop": "v-model",
            "type": "[number, number]",
            "default": "[150, 800]",
            "desc": "Tuple modelValue binding for both thumbs"
          },
          {
            "prop": "minLimit",
            "type": "number",
            "default": "0",
            "desc": "Lowest boundary limit"
          },
          {
            "prop": "maxLimit",
            "type": "number",
            "default": "1000",
            "desc": "Highest boundary limit"
          },
          {
            "prop": "step",
            "type": "number",
            "default": "10",
            "desc": "Granularity step interval"
          },
          {
            "prop": "compact",
            "type": "boolean",
            "default": "false",
            "desc": "Automatically abbreviates numbers to K, M, B (e.g. 150K, 2.5M)"
          },
          {
            "prop": "showLimits",
            "type": "boolean",
            "default": "true",
            "desc": "Displays min & max limit chips underneath"
          },
          {
            "prop": "thousandSeparator",
            "type": "boolean",
            "default": "true",
            "desc": "Enables comma/dot thousands separator"
          },
          {
            "prop": "prefix",
            "type": "string",
            "default": "'$'",
            "desc": "Currency or unit prefix string"
          },
          {
            "prop": "suffix",
            "type": "string",
            "default": "''",
            "desc": "Unit suffix string (e.g. /mo, IDR)"
          },
          {
            "prop": "formatter",
            "type": "(val: number) => string",
            "default": "undefined",
            "desc": "Custom value formatter function"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Color theme variant"
          }
        ],
        "slotsData": [
          {
            "slot": "label",
            "bindings": "{ label, min, max }",
            "desc": "Custom slider label rendering"
          },
          {
            "slot": "value",
            "bindings": "{ min, max, formattedMin, formattedMax }",
            "desc": "Custom range readout pill"
          },
          {
            "slot": "minLimit",
            "bindings": "{ min, formatted }",
            "desc": "Custom lowest boundary limit chip"
          },
          {
            "slot": "maxLimit",
            "bindings": "{ max, formatted }",
            "desc": "Custom highest boundary limit chip"
          }
        ],
        "eventsData": [
          {
            "event": "update:min",
            "payload": "number",
            "desc": "Fired when minimum handle moves"
          },
          {
            "event": "update:max",
            "payload": "number",
            "desc": "Fired when maximum handle moves"
          },
          {
            "event": "update:modelValue",
            "payload": "[number, number]",
            "desc": "Fired when either thumb moves"
          },
          {
            "event": "change",
            "payload": "[number, number]",
            "desc": "Fired on drag release"
          }
        ]
      },
      {
        "id": "CrmlSearchTagFilter",
        "name": "CrmlSearchTagFilter",
        "category": "Form Suite",
        "type": "Filter Search",
        "desc": "Tactile search input bar integrated with customizable filter tag pills, count badges, quick shortcuts (⌘K), and reset actions.",
        "icon": "🔍",
        "badge": "TAG CUSTOMIZATION ✦",
        "designNotes": "2.5px solid ink border, 3px solid drop shadow. Filter pills animate with -1px/-1px hover and 2px/2px active press.",
        "apiData": [
          {
            "prop": "v-model:search",
            "type": "string",
            "default": "''",
            "desc": "Search query input text"
          },
          {
            "prop": "v-model:activeTag",
            "type": "string",
            "default": "'all'",
            "desc": "Single active tag ID"
          },
          {
            "prop": "v-model:selectedTags",
            "type": "string[]",
            "default": "[]",
            "desc": "Array of active tag IDs for multiSelect mode"
          },
          {
            "prop": "tags / availableTags",
            "type": "Array<string | FilterTag>",
            "default": "[]",
            "desc": "Filter tag options with count, color, icon, badge, and disabled state"
          },
          {
            "prop": "multiSelect",
            "type": "boolean",
            "default": "false",
            "desc": "Allows selecting multiple tag pills simultaneously"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Theme color variant"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Component size dimension"
          },
          {
            "prop": "filterLabelText",
            "type": "string",
            "default": "'FILTER:'",
            "desc": "Text label preceding tag pills row"
          },
          {
            "prop": "showFilterLabel",
            "type": "boolean",
            "default": "true",
            "desc": "Displays or hides the \"FILTER:\" label string"
          },
          {
            "prop": "showCounts",
            "type": "boolean",
            "default": "true",
            "desc": "Displays or hides numerical (count) badges on tags"
          },
          {
            "prop": "tagRemovable",
            "type": "boolean",
            "default": "false",
            "desc": "Shows [×] button to remove/delete individual tags"
          },
          {
            "prop": "showClearTags",
            "type": "boolean",
            "default": "false",
            "desc": "Shows a Reset Filters button when tags are active"
          },
          {
            "prop": "clearTagsText",
            "type": "string",
            "default": "'Reset Filters'",
            "desc": "Label text on the clear filters button"
          },
          {
            "prop": "formatCount",
            "type": "(count, tag) => string",
            "default": "undefined",
            "desc": "Custom tag count formatting function"
          }
        ],
        "slotsData": [
          {
            "slot": "prefix",
            "bindings": "-",
            "desc": "Custom search bar prefix icon"
          },
          {
            "slot": "shortcut",
            "bindings": "-",
            "desc": "Custom keyboard shortcut chip"
          },
          {
            "slot": "label",
            "bindings": "-",
            "desc": "Custom filter row label"
          },
          {
            "slot": "tag",
            "bindings": "{ tag, isActive }",
            "desc": "Custom tag pill template"
          },
          {
            "slot": "tagPrefix",
            "bindings": "{ tag, isActive }",
            "desc": "Custom icon or prefix within tag pill"
          },
          {
            "slot": "tagCount",
            "bindings": "{ count, tag }",
            "desc": "Custom counter badge rendering"
          },
          {
            "slot": "tagSuffix",
            "bindings": "{ tag, isActive }",
            "desc": "Custom suffix or decorator inside tag pill"
          },
          {
            "slot": "clearTags",
            "bindings": "{ hasActive, clear }",
            "desc": "Custom reset/clear filters button"
          },
          {
            "slot": "filterExtra",
            "bindings": "-",
            "desc": "Additional actions at the end of the filter row"
          }
        ],
        "eventsData": [
          {
            "event": "update:search",
            "payload": "string",
            "desc": "Fired as search text changes"
          },
          {
            "event": "update:activeTag",
            "payload": "string",
            "desc": "Fired when active tag changes in single-select"
          },
          {
            "event": "update:selectedTags",
            "payload": "string[]",
            "desc": "Fired when active tags array changes in multi-select"
          },
          {
            "event": "tag-click",
            "payload": "FilterTag",
            "desc": "Fired when any tag pill is clicked"
          },
          {
            "event": "clear-tags",
            "payload": "void",
            "desc": "Fired when reset/clear tags button is pressed"
          },
          {
            "event": "remove-tag",
            "payload": "FilterTag",
            "desc": "Fired when an individual tag close button is clicked"
          }
        ]
      },
      {
        "id": "CrmlOtpInput",
        "name": "CrmlOtpInput",
        "category": "Form Suite",
        "type": "OTP PIN Input",
        "desc": "Mechanical PIN verification digit input with auto-advance, backspace navigation, paste handling, custom separators, and masking.",
        "icon": "🔑",
        "badge": "AUTO-FOCUS & PASTE ✦",
        "designNotes": "2.5px solid ink border, 3px solid drop shadow, and instant background color fill upon entering digits.",
        "apiData": [
          {
            "prop": "v-model",
            "type": "string",
            "default": "''",
            "desc": "Full OTP code string binding"
          },
          {
            "prop": "length",
            "type": "number",
            "default": "6",
            "desc": "Number of digit boxes"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'",
            "default": "'lime'",
            "desc": "Color theme variant"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Input box size dimension"
          },
          {
            "prop": "mask",
            "type": "boolean",
            "default": "false",
            "desc": "Masks entered digits with bullet dots"
          },
          {
            "prop": "separator",
            "type": "string",
            "default": "undefined",
            "desc": "Separator character (e.g. \"-\") between digit groups"
          },
          {
            "prop": "separatorIndex",
            "type": "number",
            "default": "3",
            "desc": "Digit index after which separator is rendered"
          },
          {
            "prop": "label",
            "type": "string",
            "default": "''",
            "desc": "Header title label"
          },
          {
            "prop": "error",
            "type": "string",
            "default": "''",
            "desc": "Error text message"
          },
          {
            "prop": "helperText",
            "type": "string",
            "default": "''",
            "desc": "Helpful caption text"
          }
        ],
        "slotsData": [
          {
            "slot": "label",
            "bindings": "-",
            "desc": "Custom header label"
          },
          {
            "slot": "separator",
            "bindings": "-",
            "desc": "Custom separator element"
          },
          {
            "slot": "error",
            "bindings": "-",
            "desc": "Custom error display"
          },
          {
            "slot": "helper",
            "bindings": "-",
            "desc": "Custom helper caption"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "string",
            "desc": "Fired on every digit input"
          },
          {
            "event": "complete",
            "payload": "string",
            "desc": "Fired when all digit boxes are completely filled"
          },
          {
            "event": "input",
            "payload": "string",
            "desc": "Fired on raw character input"
          }
        ]
      },
      {
        "id": "CrmlCheckbox",
        "name": "CrmlCheckbox",
        "category": "Form Suite",
        "type": "Checkbox",
        "desc": "Tactile arcade checkbox with 3D solid ink offset box, spring checkmark animation, and indeterminate state.",
        "icon": "☑️",
        "designNotes": "Solid 2.5px ink border, 3px drop shadow, zero ambient blur. Fills with Electric Lime on check.",
        "apiData": [
          {
            "prop": "v-model",
            "type": "boolean",
            "default": "false",
            "desc": "Checked state binding"
          },
          {
            "prop": "label",
            "type": "string",
            "default": "''",
            "desc": "Label text beside checkbox"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Color theme variant"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Size tier"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "default": "false",
            "desc": "Disables interaction"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Custom label or rich text"
          },
          {
            "slot": "icon",
            "bindings": "{ checked }",
            "desc": "Custom checkmark icon"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "boolean",
            "desc": "Fired on toggle"
          },
          {
            "event": "change",
            "payload": "boolean",
            "desc": "Fired on state change"
          }
        ]
      },
      {
        "id": "CrmlNeonSwitch",
        "name": "CrmlNeonSwitch",
        "category": "Form Suite",
        "type": "Toggle Switch",
        "desc": "Neon toggle switch with mechanical spring toggle physics, custom ON/OFF labels, and icon slots.",
        "icon": "⚡",
        "designNotes": "Solid ink border 2.5px, 3px hard drop shadow, sliding physical toggle thumb.",
        "apiData": [
          {
            "prop": "v-model",
            "type": "boolean",
            "default": "false",
            "desc": "Active switch state binding"
          },
          {
            "prop": "label",
            "type": "string",
            "default": "''",
            "desc": "Label text beside switch"
          },
          {
            "prop": "onLabel",
            "type": "string",
            "default": "'ON'",
            "desc": "Text shown when switch is active"
          },
          {
            "prop": "offLabel",
            "type": "string",
            "default": "'OFF'",
            "desc": "Text shown when switch is inactive"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Color theme variant"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Switch dimension"
          }
        ],
        "slotsData": [
          {
            "slot": "label",
            "bindings": "-",
            "desc": "Custom switch title label"
          },
          {
            "slot": "thumb",
            "bindings": "{ active }",
            "desc": "Custom thumb icon or emoji"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "boolean",
            "desc": "Fired on toggle"
          }
        ]
      },
      {
        "id": "CrmlRadioGroup",
        "name": "CrmlRadioGroup",
        "category": "Form Suite",
        "type": "Radio Group",
        "desc": "Tile-based radio selection cards supporting grid, stack, and row layouts, badges, icons, and theme color fills.",
        "icon": "🔘",
        "designNotes": "2.5px solid ink border, 2.5px solid drop shadow, tactile active compression.",
        "apiData": [
          {
            "prop": "options",
            "type": "RadioOption[]",
            "default": "[]",
            "desc": "Array of options ({ value, label, description, icon, badge, disabled })"
          },
          {
            "prop": "modelValue",
            "type": "string",
            "default": "''",
            "desc": "Selected option value"
          },
          {
            "prop": "label",
            "type": "string",
            "default": "''",
            "desc": "Group title label"
          },
          {
            "prop": "layout",
            "type": "'grid' | 'stack' | 'row'",
            "default": "'grid'",
            "desc": "Layout alignment mode"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'",
            "default": "'lime'",
            "desc": "Active tile theme color"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Tile size tier"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "default": "false",
            "desc": "Disables all radio options"
          }
        ],
        "slotsData": [
          {
            "slot": "label",
            "bindings": "{ label }",
            "desc": "Custom group header label"
          },
          {
            "slot": "option",
            "bindings": "{ option, isSelected }",
            "desc": "Full custom radio tile template"
          },
          {
            "slot": "icon",
            "bindings": "{ option, isSelected }",
            "desc": "Custom icon per option"
          },
          {
            "slot": "content",
            "bindings": "{ option, isSelected }",
            "desc": "Custom label, badge, and description"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "string",
            "desc": "Fired on option selection"
          },
          {
            "event": "change",
            "payload": "(value, option)",
            "desc": "Fired with selected value and option object"
          }
        ]
      },
      {
        "id": "CrmlSegmentedControl",
        "name": "CrmlSegmentedControl",
        "category": "Form Suite",
        "type": "Segmented Control",
        "desc": "Tactile segmented toggle track with smooth transitions, custom option icons, numeric badges, and size variants.",
        "icon": "📊",
        "designNotes": "3px solid ink border, solid ink drop shadow, active pill highlighted with brand token colors.",
        "apiData": [
          {
            "prop": "v-model",
            "type": "string",
            "default": "''",
            "desc": "Selected option ID"
          },
          {
            "prop": "options",
            "type": "Array<string | SegmentOption>",
            "default": "[]",
            "desc": "List of segment options with id, label, icon, badge, variant"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'",
            "default": "'lime'",
            "desc": "Active segment color theme"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Pill size dimension"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "default": "false",
            "desc": "Disables interaction"
          }
        ],
        "slotsData": [
          {
            "slot": "option",
            "bindings": "{ option, isSelected }",
            "desc": "Custom segment pill template"
          },
          {
            "slot": "icon",
            "bindings": "{ option, isSelected }",
            "desc": "Custom segment icon"
          },
          {
            "slot": "label",
            "bindings": "{ option, isSelected }",
            "desc": "Segment text label"
          },
          {
            "slot": "badge",
            "bindings": "{ option, isSelected }",
            "desc": "Custom badge count or indicator"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "string",
            "desc": "Fired on segment selection"
          },
          {
            "event": "change",
            "payload": "(id, option)",
            "desc": "Fired on segment change"
          }
        ]
      },
      {
        "id": "CrmlFileUpload",
        "name": "CrmlFileUpload",
        "category": "Form Suite",
        "type": "File Dropzone",
        "desc": "Neubrutalist drag & drop file upload zone with floppy disk icon, size limits, progress bar, and slot customization.",
        "icon": "💾",
        "designNotes": "2.5px solid ink border, 3px solid drop shadow, high-contrast dashed drop target.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "'DROP FILES HERE'",
            "desc": "Dropzone primary title"
          },
          {
            "prop": "description",
            "type": "string",
            "default": "'SUPPORTED: .FIG, .JSON, .PNG (MAX 50MB)'",
            "desc": "Format and file size hint"
          },
          {
            "prop": "maxSize",
            "type": "number",
            "default": "50",
            "desc": "Maximum file size limit in MB"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Color theme variant"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "default": "false",
            "desc": "Disables dropzone interaction"
          }
        ],
        "slotsData": [
          {
            "slot": "icon",
            "bindings": "-",
            "desc": "Custom dropzone icon"
          },
          {
            "slot": "title",
            "bindings": "-",
            "desc": "Custom dropzone title"
          },
          {
            "slot": "description",
            "bindings": "-",
            "desc": "Custom dropzone format hint"
          },
          {
            "slot": "progress",
            "bindings": "{ percent, fileName }",
            "desc": "Custom upload progress indicator"
          }
        ],
        "eventsData": [
          {
            "event": "drop",
            "payload": "FileList",
            "desc": "Fired when files are dropped"
          },
          {
            "event": "change",
            "payload": "File[]",
            "desc": "Fired when valid files are selected"
          }
        ]
      },
      {
        "id": "CrmlTagInput",
        "name": "CrmlTagInput",
        "category": "Form Suite",
        "type": "Tag Input",
        "desc": "Tag chip input field with add/remove tags, keyboard enter support, and duplicate prevention.",
        "icon": "🏷️",
        "designNotes": "Solid 2px ink borders with 2px offset drop shadow.",
        "apiData": [
          {
            "prop": "v-model",
            "type": "string[]",
            "default": "[]",
            "desc": "List of active tags"
          },
          {
            "prop": "label",
            "type": "string",
            "default": "''",
            "desc": "Field label"
          },
          {
            "prop": "placeholder",
            "type": "string",
            "default": "'Add tag + enter...'",
            "desc": "Input placeholder"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Color theme variant"
          }
        ],
        "slotsData": [
          {
            "slot": "tag",
            "bindings": "{ tag, remove }",
            "desc": "Custom tag pill template"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "string[]",
            "desc": "Fired when tags array updates"
          },
          {
            "event": "add-tag",
            "payload": "string",
            "desc": "Fired when a new tag is added"
          },
          {
            "event": "remove-tag",
            "payload": "string",
            "desc": "Fired when a tag is deleted"
          }
        ]
      },
      {
        "id": "CrmlFaceIdToggle",
        "name": "CrmlFaceIdToggle",
        "category": "Form Suite",
        "type": "Biometric Scanner",
        "desc": "Biometric scanner toggle button with animated reticle line and scanning status.",
        "icon": "👁️",
        "designNotes": "Heavy 3px ink stroke, 3px solid black shadow, zero soft drop blur.",
        "apiData": [
          {
            "prop": "v-model",
            "type": "boolean",
            "default": "false",
            "desc": "Scanning status state"
          },
          {
            "prop": "label",
            "type": "string",
            "default": "'BIOMETRIC SCANNER'",
            "desc": "Button title"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Color theme variant"
          }
        ],
        "slotsData": [
          {
            "slot": "icon",
            "bindings": "{ active }",
            "desc": "Custom scanner reticle icon"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "boolean",
            "desc": "Fired on scan toggle"
          }
        ]
      },
      {
        "id": "CrmlAiPromptInput",
        "name": "CrmlAiPromptInput",
        "category": "Form Suite",
        "type": "AI Prompt Input",
        "desc": "AI prompt bar with model selection chips, token gauge indicator, and submit action button.",
        "icon": "🤖",
        "designNotes": "Hard 3px ink border, 4px solid drop shadow, Electric Lime action button.",
        "apiData": [
          {
            "prop": "v-model",
            "type": "string",
            "default": "''",
            "desc": "Prompt input query string"
          },
          {
            "prop": "placeholder",
            "type": "string",
            "default": "'Ask AI...'",
            "desc": "Prompt input placeholder"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Theme variant"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "default": "false",
            "desc": "Disables input and send button"
          }
        ],
        "slotsData": [
          {
            "slot": "models",
            "bindings": "-",
            "desc": "Custom model selection dropdown or chips"
          },
          {
            "slot": "send-btn",
            "bindings": "{ submit }",
            "desc": "Custom submit button"
          }
        ],
        "eventsData": [
          {
            "event": "submit",
            "payload": "string",
            "desc": "Fired on prompt send"
          }
        ]
      },
      {
        "id": "CrmlColorPicker",
        "name": "CrmlColorPicker",
        "category": "Form Suite",
        "type": "Color Swatch",
        "desc": "Swatches palette selector and HEX input color field with instant preview swatch.",
        "icon": "🎨",
        "designNotes": "2.5px solid ink border, 3px drop shadow, zero ambient blur.",
        "apiData": [
          {
            "prop": "v-model",
            "type": "string",
            "default": "'#CCFF00'",
            "desc": "HEX color string"
          },
          {
            "prop": "colors",
            "type": "string[]",
            "default": "Brand Palette",
            "desc": "Preset color swatches array"
          },
          {
            "prop": "label",
            "type": "string",
            "default": "'COLOR PICKER'",
            "desc": "Header title"
          }
        ],
        "slotsData": [
          {
            "slot": "label",
            "bindings": "-",
            "desc": "Custom header label"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "string",
            "desc": "Fired on color pick"
          }
        ]
      },
      {
        "id": "CrmlRichTextEditor",
        "name": "CrmlRichTextEditor",
        "category": "Form Suite",
        "type": "WYSIWYG Editor",
        "desc": "Tactile rich text editor with bold/italic/underline toolbar, link insertion, and raw HTML code view mode.",
        "icon": "📝",
        "badge": "WYSIWYG ✦",
        "designNotes": "Solid 3px Obsidian Black frame, 4px solid shadow, retro title bar with dot buttons.",
        "apiData": [
          {
            "prop": "v-model",
            "type": "string",
            "default": "''",
            "desc": "HTML content value"
          },
          {
            "prop": "title",
            "type": "string",
            "default": "'DOCUMENT.TXT'",
            "desc": "Window header title"
          },
          {
            "prop": "placeholder",
            "type": "string",
            "default": "'Type document content...'",
            "desc": "Empty editor placeholder"
          }
        ],
        "slotsData": [
          {
            "slot": "toolbar",
            "bindings": "{ execCommand }",
            "desc": "Custom toolbar action buttons"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "string",
            "desc": "Fired on content change"
          }
        ]
      }
    ]
  },
  {
    "name": "BUTTONS & BADGES",
    "items": [
      {
        "id": "CrmlButton",
        "name": "CrmlButton",
        "category": "Atoms",
        "type": "Neubrutal Button",
        "desc": "Standard neubrutalist button with 2.5px solid ink stroke, 3px offset shadow, spring rebound physics, and left/right icon placement.",
        "icon": "🔘",
        "designNotes": "Rule 3 Physics: Resting: translate(0,0) box-shadow: 3px 3px 0px #0D0D0D. Hover: translate(-1px, -1px) box-shadow: 4px 4px 0px #0D0D0D. Active: translate(2px, 2px) box-shadow: 1px 1px 0px #0D0D0D.",
        "apiData": [
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
            "default": "'primary'",
            "desc": "Color variant theme"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Button size dimension"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "default": "false",
            "desc": "Disabled interactive state"
          },
          {
            "prop": "loading",
            "type": "boolean",
            "default": "false",
            "desc": "Displays loading spinner"
          },
          {
            "prop": "icon",
            "type": "string",
            "default": "undefined",
            "desc": "Icon string (placed left by default)"
          },
          {
            "prop": "iconLeft",
            "type": "string",
            "default": "undefined",
            "desc": "Left icon string or emoji"
          },
          {
            "prop": "iconRight",
            "type": "string",
            "default": "undefined",
            "desc": "Right icon string or emoji"
          },
          {
            "prop": "iconPosition",
            "type": "'left' | 'right'",
            "default": "'left'",
            "desc": "Position for prop icon"
          },
          {
            "prop": "brutal",
            "type": "boolean",
            "default": "true",
            "desc": "Enables 2.5px solid ink border & 3px shadow"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Main button label or content"
          },
          {
            "slot": "iconLeft",
            "bindings": "-",
            "desc": "Custom left icon or SVG"
          },
          {
            "slot": "iconRight",
            "bindings": "-",
            "desc": "Custom right icon or SVG"
          },
          {
            "slot": "icon",
            "bindings": "-",
            "desc": "Fallback icon slot"
          }
        ],
        "eventsData": [
          {
            "event": "click",
            "payload": "MouseEvent",
            "desc": "Fired on click when not disabled or loading"
          }
        ]
      },
      {
        "id": "CrmlBouncyButton",
        "name": "CrmlBouncyButton",
        "category": "Atoms",
        "type": "Arcade Button",
        "desc": "Mechanical arcade button with 4px spring compression physics, rounded or brutal shapes, and gradient variants.",
        "icon": "🎮",
        "badge": "TACTILE ✦",
        "designNotes": "Resting: translate(0,0) box-shadow: 4px 4px 0px #0D0D0D. Hover: translate(-1px, -1px) box-shadow: 5px 5px 0px #0D0D0D. Active: translate(3px, 3px) box-shadow: 1px 1px 0px #0D0D0D.",
        "apiData": [
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'white' | 'obsidian' | 'grad-y2k' | 'grad-acid'",
            "default": "'lime'",
            "desc": "Button color variant"
          },
          {
            "prop": "shape",
            "type": "'brutal' | 'rounded'",
            "default": "'brutal'",
            "desc": "Border radius style"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Button size tier"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "default": "false",
            "desc": "Disabled interactive state"
          },
          {
            "prop": "loading",
            "type": "boolean",
            "default": "false",
            "desc": "Displays loading spinner"
          },
          {
            "prop": "iconLeft",
            "type": "string",
            "default": "undefined",
            "desc": "Left icon string or emoji"
          },
          {
            "prop": "iconRight",
            "type": "string",
            "default": "undefined",
            "desc": "Right icon string or emoji"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Button text content"
          },
          {
            "slot": "iconLeft",
            "bindings": "-",
            "desc": "Custom left icon or SVG"
          },
          {
            "slot": "iconRight",
            "bindings": "-",
            "desc": "Custom right icon or SVG"
          }
        ],
        "eventsData": [
          {
            "event": "click",
            "payload": "MouseEvent",
            "desc": "Fired on click when not disabled or loading"
          }
        ]
      },
      {
        "id": "CrmlBadge",
        "name": "CrmlBadge",
        "category": "Atoms",
        "type": "Status Badge",
        "desc": "High contrast status pill badge tag with solid ink border, removable close button, and design system color tokens.",
        "icon": "🏷️",
        "designNotes": "2px solid ink border (#0D0D0D), 2px solid drop-shadow, zero soft ambient blur.",
        "apiData": [
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'neutral' | 'obsidian' | 'primary' | 'success' | 'warning' | 'danger'",
            "default": "'lime'",
            "desc": "Color theme variant (supports both brand and legacy names)"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Badge size tier"
          },
          {
            "prop": "removable",
            "type": "boolean",
            "default": "false",
            "desc": "Shows [×] button to remove/dismiss badge"
          },
          {
            "prop": "icon",
            "type": "string",
            "default": "undefined",
            "desc": "Optional prefix icon string"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Badge label text"
          },
          {
            "slot": "icon",
            "bindings": "-",
            "desc": "Custom prefix icon"
          }
        ],
        "eventsData": [
          {
            "event": "remove",
            "payload": "void",
            "desc": "Fired when remove [×] button is clicked"
          }
        ]
      },
      {
        "id": "CrmlStickerBadge",
        "name": "CrmlStickerBadge",
        "category": "Atoms",
        "type": "Sticker Tag",
        "desc": "Vinyl sticker badge with tilt angles, star accent badge, and peel-off hover effect.",
        "icon": "🔥",
        "badge": "PEEL-OFF",
        "designNotes": "Simulates physical streetwear vinyl decals with solid ink border and angular rotation.",
        "apiData": [
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'pink'",
            "desc": "Sticker color theme"
          },
          {
            "prop": "tilt",
            "type": "'left' | 'right' | 'none'",
            "default": "'left'",
            "desc": "Angular tilt rotation"
          },
          {
            "prop": "star",
            "type": "boolean",
            "default": "false",
            "desc": "Show star badge accent"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Sticker text content"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlStampBadge",
        "name": "CrmlStampBadge",
        "category": "Atoms",
        "type": "Ink Stamp",
        "desc": "Ink stamp badge with rotated border stroke, stamped texture, and verification labels.",
        "icon": "💮",
        "designNotes": "Rotated -4deg, 2.5px solid ink border, uppercase stencil typography.",
        "apiData": [
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'pink'",
            "desc": "Stamp color variant"
          },
          {
            "prop": "text",
            "type": "string",
            "default": "'VERIFIED'",
            "desc": "Stamp text label"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Custom stamp content"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlMarquee",
        "name": "CrmlMarquee",
        "category": "Atoms",
        "type": "Running Ticker",
        "desc": "High-contrast continuous running text ticker banner with speed control and pause-on-hover.",
        "icon": "⚡",
        "designNotes": "Solid 2.5px top and bottom ink borders, continuous smooth CSS keyframe translation.",
        "apiData": [
          {
            "prop": "text",
            "type": "string",
            "default": "''",
            "desc": "Marquee text string"
          },
          {
            "prop": "speed",
            "type": "number",
            "default": "14",
            "desc": "Scroll duration in seconds"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Banner theme"
          },
          {
            "prop": "pauseOnHover",
            "type": "boolean",
            "default": "true",
            "desc": "Pauses animation on mouse hover"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Custom ticker item content"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlBlobAvatar",
        "name": "CrmlBlobAvatar",
        "category": "Atoms",
        "type": "Blob Avatar",
        "desc": "Squircle and organic blob avatar frame with offset status badge, image support, and click events.",
        "icon": "👤",
        "designNotes": "Solid 2.5px ink border, 3px solid black drop-shadow, organic SVG clip path.",
        "apiData": [
          {
            "prop": "src",
            "type": "string",
            "default": "undefined",
            "desc": "Avatar image URL"
          },
          {
            "prop": "text",
            "type": "string",
            "default": "'K'",
            "desc": "Fallback avatar initials or emoji"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Avatar diameter"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Background color"
          }
        ],
        "slotsData": [
          {
            "slot": "fallback",
            "bindings": "-",
            "desc": "Custom fallback when image is loading or missing"
          },
          {
            "slot": "badge",
            "bindings": "-",
            "desc": "Custom status badge on corner"
          }
        ],
        "eventsData": [
          {
            "event": "click",
            "payload": "MouseEvent",
            "desc": "Fired when avatar is clicked"
          }
        ]
      },
      {
        "id": "CrmlSpeechBubble",
        "name": "CrmlSpeechBubble",
        "category": "Atoms",
        "type": "Speech Bubble",
        "desc": "Comic-style speech bubble container with triangular point tail, solid ink border, and high-contrast fill.",
        "icon": "💬",
        "designNotes": "Solid 2.5px border with 3px solid black drop shadow. Tail maintains solid stroke.",
        "apiData": [
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'white'",
            "default": "'cyan'",
            "desc": "Bubble color theme"
          },
          {
            "prop": "direction",
            "type": "'left' | 'right' | 'top' | 'bottom'",
            "default": "'bottom'",
            "desc": "Point tail direction"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Speech bubble message content"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlPixelIconWrapper",
        "name": "CrmlPixelIconWrapper",
        "category": "Atoms",
        "type": "Pixel Icon Frame",
        "desc": "Retro 8-bit pixel icon wrapper frame with sharp corners and high-contrast color fill.",
        "icon": "👾",
        "designNotes": "Stepped pixel corners, solid 2.5px black border, zero blur.",
        "apiData": [
          {
            "prop": "icon",
            "type": "string",
            "default": "'⚡'",
            "desc": "Icon glyph or emoji"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Frame dimensions"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Color theme variant"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Custom SVG or icon"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlIcon",
        "name": "CrmlIcon",
        "category": "Atoms",
        "type": "Bespoke Icon Suite",
        "desc": "Universal bespoke vector icon component with 112+ native geometric Neubrutalism & Y2K Cyber Mecha icons. 100% zero external dependencies.",
        "icon": "⚡",
        "badge": "112 BESPOKE ICONS ✦",
        "designNotes": "Solid 2.5px/3px ink stroke, miter geometric corners, zero blur, and tactile color token integration across Vue, React, Svelte, and HTML5.",
        "apiData": [
          {
            "prop": "name",
            "type": "CrmlIconName",
            "default": "'bolt'",
            "desc": "Icon identifier from 112 bespoke icons (e.g. 'bolt', 'coffee', 'terminal', 'radar', 'disk', 'star', 'moon', etc.)"
          },
          {
            "prop": "size",
            "type": "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
            "default": "'md'",
            "desc": "Dimensions: 'xs'=16px, 'sm'=20px, 'md'=24px, 'lg'=32px, 'xl'=40px, or custom number in px"
          },
          {
            "prop": "variant",
            "type": "'current' | 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian' | 'white' | 'ghost'",
            "default": "'current'",
            "desc": "Tactile theme color variant"
          },
          {
            "prop": "strokeWidth",
            "type": "number | string",
            "default": "2.5",
            "desc": "Stroke thickness width"
          },
          {
            "prop": "spin",
            "type": "boolean",
            "default": "false",
            "desc": "Continuous spin animation toggle"
          },
          {
            "prop": "title",
            "type": "string",
            "default": "undefined",
            "desc": "Accessible title tag"
          }
        ],
        "slotsData": [],
        "eventsData": []
      },
      {
        "id": "CrmlDivider",
        "name": "CrmlDivider",
        "category": "Layout & Divider",
        "type": "Divider",
        "desc": "Solid ink Neubrutalist section divider with optional badge label, icon chip, and solid 2.5px border stroke.",
        "icon": "➖",
        "badge": "DIVIDER // SOLID",
        "designNotes": "Provides visual separation between layout sections with strict 0% blur ink borders and customizable label slots.",
        "apiData": [
          {
            "prop": "label",
            "type": "string",
            "default": "undefined",
            "desc": "Center text or section title inside the divider"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'",
            "default": "'obsidian'",
            "desc": "Color variant of divider border and optional badge"
          },
          {
            "prop": "dashed",
            "type": "boolean",
            "default": "false",
            "desc": "Renders dashed ink border instead of solid line"
          },
          {
            "prop": "thickness",
            "type": "string",
            "default": "'2.5px'",
            "desc": "Border stroke thickness"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "{}",
            "desc": "Custom center badge or content override"
          }
        ],
        "eventsData": []
      }
    ]
  },
  {
    "name": "CONTAINERS & CARDS",
    "items": [
      {
        "id": "CrmlCard",
        "name": "CrmlCard",
        "category": "Organisms",
        "type": "Base Card",
        "desc": "Physical surface card container with solid ink border stroke, solid drop shadow, media slot, header extra actions, and color variants.",
        "icon": "🎴",
        "designNotes": "Zero ambient blur policy. Solid 3px #0D0D0D ink border, 4px solid drop shadow, 12px-16px corner radius.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "''",
            "desc": "Card header title"
          },
          {
            "prop": "subtitle",
            "type": "string",
            "default": "''",
            "desc": "Card subtitle text"
          },
          {
            "prop": "variant",
            "type": "'default' | 'elevated' | 'outlined' | 'brutal' | 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'",
            "default": "'brutal'",
            "desc": "Card visual or brand color variant"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Padding size tier"
          },
          {
            "prop": "bordered",
            "type": "boolean",
            "default": "true",
            "desc": "Renders 3px solid ink border"
          },
          {
            "prop": "hoverable",
            "type": "boolean",
            "default": "false",
            "desc": "Enables -2px/-2px hover spring translation"
          },
          {
            "prop": "noPadding",
            "type": "boolean",
            "default": "false",
            "desc": "Removes padding from body"
          },
          {
            "prop": "clickable",
            "type": "boolean",
            "default": "false",
            "desc": "Makes card clickable with cursor pointer"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Card body content"
          },
          {
            "slot": "header",
            "bindings": "-",
            "desc": "Custom card header section"
          },
          {
            "slot": "headerExtra",
            "bindings": "-",
            "desc": "Action buttons or badges in header top-right"
          },
          {
            "slot": "media",
            "bindings": "-",
            "desc": "Full-bleed image or video media at top of card"
          },
          {
            "slot": "footer",
            "bindings": "-",
            "desc": "Card footer section"
          }
        ],
        "eventsData": [
          {
            "event": "click",
            "payload": "MouseEvent",
            "desc": "Fired when card is clicked (if clickable=true)"
          }
        ]
      },
      {
        "id": "CrmlNeubrutalCard",
        "name": "CrmlNeubrutalCard",
        "category": "Organisms",
        "type": "Neubrutal Card",
        "desc": "Heavy neubrutal card container with colored header banner and solid ink drop shadow.",
        "icon": "📦",
        "designNotes": "Heavy 3px solid ink border with 5px solid black drop shadow. Banner is colored with brand tokens.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "''",
            "desc": "Card title"
          },
          {
            "prop": "headerColor",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Header banner background color"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Size tier"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Card body content"
          },
          {
            "slot": "header-extra",
            "bindings": "-",
            "desc": "Header action buttons"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlPricingCard",
        "name": "CrmlPricingCard",
        "category": "Organisms",
        "type": "Pricing Card",
        "desc": "Feature-packed SaaS tier pricing card with popular badge, subtitle, description, custom check/cross icons, custom CTA buttons, and flexible feature lists.",
        "icon": "💎",
        "badge": "SLOTS & FORMATTER ✦",
        "designNotes": "3px solid ink border (#0D0D0D), 4px-6px solid offset drop shadow, 16px corner radius, zero ambient blur.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "'PRO MECHA TIER'",
            "desc": "Pricing tier title"
          },
          {
            "prop": "subtitle / description",
            "type": "string",
            "default": "''",
            "desc": "Explanatory description text"
          },
          {
            "prop": "price",
            "type": "string | number",
            "default": "'$88.00'",
            "desc": "Price amount (number or string)"
          },
          {
            "prop": "currency",
            "type": "string",
            "default": "''",
            "desc": "Currency symbol prefix"
          },
          {
            "prop": "priceFormatter",
            "type": "(val) => string",
            "default": "undefined",
            "desc": "Custom price formatting function"
          },
          {
            "prop": "period",
            "type": "string",
            "default": "'/ MONTH'",
            "desc": "Billing period suffix"
          },
          {
            "prop": "popular",
            "type": "boolean",
            "default": "true",
            "desc": "Renders highlighted popular ribbon badge"
          },
          {
            "prop": "badgeText",
            "type": "string",
            "default": "'POPULAR'",
            "desc": "Popular badge text label"
          },
          {
            "prop": "features",
            "type": "Array<string | PricingFeature>",
            "default": "[]",
            "desc": "List of features ({ text, included, icon, badge })"
          },
          {
            "prop": "buttonText",
            "type": "string",
            "default": "'GET PRO MECHA 🚀'",
            "desc": "CTA button text"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'pink'",
            "desc": "Card highlight theme"
          },
          {
            "prop": "ctaVariant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'",
            "default": "undefined",
            "desc": "CTA button color variant override"
          },
          {
            "prop": "ctaDisabled",
            "type": "boolean",
            "default": "false",
            "desc": "Disables CTA button"
          },
          {
            "prop": "checkIcon",
            "type": "string",
            "default": "'✓'",
            "desc": "Included feature bullet icon"
          },
          {
            "prop": "crossIcon",
            "type": "string",
            "default": "'✕'",
            "desc": "Excluded feature bullet icon"
          }
        ],
        "slotsData": [
          {
            "slot": "badge",
            "bindings": "{ badgeText, popular }",
            "desc": "Custom popular or promo badge"
          },
          {
            "slot": "header",
            "bindings": "{ title, subtitle, description }",
            "desc": "Custom card header block"
          },
          {
            "slot": "title",
            "bindings": "-",
            "desc": "Plan title override"
          },
          {
            "slot": "price",
            "bindings": "{ price, rawPrice, period }",
            "desc": "Custom price value and billing period"
          },
          {
            "slot": "features",
            "bindings": "{ features }",
            "desc": "Custom features list container"
          },
          {
            "slot": "feature",
            "bindings": "{ feature, index }",
            "desc": "Individual feature item template"
          },
          {
            "slot": "footer",
            "bindings": "{ select }",
            "desc": "Custom footer or action row"
          },
          {
            "slot": "button",
            "bindings": "-",
            "desc": "Custom button content"
          }
        ],
        "eventsData": [
          {
            "event": "select",
            "payload": "void",
            "desc": "Fired when plan CTA button is pressed"
          }
        ]
      },
      {
        "id": "CrmlReviewQuoteCard",
        "name": "CrmlReviewQuoteCard",
        "category": "Organisms",
        "type": "Review Quote",
        "desc": "Customer testimonial quote card with star rating, real avatar image support, verified tag, and quote slots.",
        "icon": "⭐",
        "designNotes": "Solid 2.5px ink border with 3px solid black shadow. Verified chip in Cyber Cyan or Electric Lime.",
        "apiData": [
          {
            "prop": "quote",
            "type": "string",
            "default": "''",
            "desc": "Quote text"
          },
          {
            "prop": "authorName / author",
            "type": "string",
            "default": "''",
            "desc": "Author name"
          },
          {
            "prop": "authorRole / role",
            "type": "string",
            "default": "''",
            "desc": "Author title/role"
          },
          {
            "prop": "authorAvatar",
            "type": "string",
            "default": "''",
            "desc": "Author avatar image URL"
          },
          {
            "prop": "rating",
            "type": "number",
            "default": "5",
            "desc": "Star rating count (1-5)"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'yellow'",
            "desc": "Star rating and border color"
          },
          {
            "prop": "verifiedLabel",
            "type": "string",
            "default": "'VERIFIED BUYER'",
            "desc": "Verified badge text"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Custom quote body text"
          },
          {
            "slot": "avatar",
            "bindings": "-",
            "desc": "Custom author avatar"
          },
          {
            "slot": "verified",
            "bindings": "-",
            "desc": "Custom verified badge"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlKanbanCard",
        "name": "CrmlKanbanCard",
        "category": "Organisms",
        "type": "Kanban Card",
        "desc": "Task card with priority tag, avatar group, description, and checklist counter.",
        "icon": "📋",
        "designNotes": "3px solid ink border, 3px solid drop shadow. Draggable tactile card.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "''",
            "desc": "Task item title"
          },
          {
            "prop": "tag",
            "type": "string",
            "default": "'IN PROGRESS'",
            "desc": "Task category tag"
          },
          {
            "prop": "priority",
            "type": "'P0' | 'P1' | 'P2'",
            "default": "'P0'",
            "desc": "Priority level"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'cyan'",
            "desc": "Color variant"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Card body or description"
          },
          {
            "slot": "footer",
            "bindings": "-",
            "desc": "Custom card footer or avatars"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlGlassCard",
        "name": "CrmlGlassCard",
        "category": "Organisms",
        "type": "Glass Card",
        "desc": "Frosted surface card container with solid ink stroke, high-contrast text, and zero ambient blur.",
        "icon": "🧊",
        "designNotes": "Solid 2.5px ink border with semi-translucent backdrop and 4px solid drop shadow.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "''",
            "desc": "Card title"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'cyan'",
            "desc": "Tint color variant"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Card content"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlStickyNote",
        "name": "CrmlStickyNote",
        "category": "Organisms",
        "type": "Sticky Note",
        "desc": "Streetwear sticky note container with top tape strip, pin icon, and angular tilt.",
        "icon": "📌",
        "designNotes": "Rotated -1.5deg, tape strip in Obsidian Black with 3px solid shadow.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "''",
            "desc": "Sticky note title"
          },
          {
            "prop": "color",
            "type": "'yellow' | 'pink' | 'lime' | 'cyan'",
            "default": "'yellow'",
            "desc": "Note background theme"
          },
          {
            "prop": "showPin",
            "type": "boolean",
            "default": "true",
            "desc": "Shows top pin or tape decal"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Note text content"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlDoodleContainer",
        "name": "CrmlDoodleContainer",
        "category": "Molecules",
        "type": "Doodle Box",
        "desc": "Playful container with corner accent stickers and doodle graphics.",
        "icon": "🎨",
        "designNotes": "Solid 2.5px ink stroke with offset sticker decals.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "''",
            "desc": "Box title"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Color theme"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Box content"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlSwipeCard",
        "name": "CrmlSwipeCard",
        "category": "Organisms",
        "type": "Swipe Card",
        "desc": "Interactive swipeable card container with action triggers and gesture animations.",
        "icon": "📲",
        "designNotes": "Solid 3px ink stroke, 4px solid shadow, zero blur.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "''",
            "desc": "Card title"
          },
          {
            "prop": "subtitle",
            "type": "string",
            "default": "''",
            "desc": "Card subtitle"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'pink'",
            "desc": "Theme color"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Card body content"
          }
        ],
        "eventsData": [
          {
            "event": "swipe-left",
            "payload": "void",
            "desc": "Fired on swipe left"
          },
          {
            "event": "swipe-right",
            "payload": "void",
            "desc": "Fired on swipe right"
          }
        ]
      },
      {
        "id": "CrmlFormGroup",
        "name": "CrmlFormGroup",
        "category": "Organisms",
        "type": "Form Group",
        "desc": "Field wrapper container with label, required indicator, helper text, and error validation display.",
        "icon": "📐",
        "designNotes": "Clear typography hierarchy with monospace error tags.",
        "apiData": [
          {
            "prop": "label",
            "type": "string",
            "default": "''",
            "desc": "Field group label"
          },
          {
            "prop": "required",
            "type": "boolean",
            "default": "false",
            "desc": "Shows required asterisk badge"
          },
          {
            "prop": "error",
            "type": "string",
            "default": "''",
            "desc": "Error text message"
          },
          {
            "prop": "helperText",
            "type": "string",
            "default": "''",
            "desc": "Helper caption text"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Wrapped form input element"
          },
          {
            "slot": "label",
            "bindings": "-",
            "desc": "Custom label element"
          },
          {
            "slot": "error",
            "bindings": "-",
            "desc": "Custom error display"
          }
        ],
        "eventsData": []
      }
    ]
  },
  {
    "name": "NAV & FEEDBACK",
    "items": [
      {
        "id": "CrmlNavbar",
        "name": "CrmlNavbar",
        "category": "Organisms",
        "type": "Navigation Bar",
        "desc": "Top sticky navigation bar with brand badge, navigation links, and action buttons.",
        "icon": "🧭",
        "badge": "HEADER",
        "designNotes": "3px solid ink border (#0D0D0D), 4px solid shadow, sticky top position.",
        "apiData": [
          {
            "prop": "brandText",
            "type": "string",
            "default": "'CRML'",
            "desc": "Brand logo text"
          },
          {
            "prop": "brandBadge",
            "type": "string",
            "default": "'v5.5'",
            "desc": "Brand badge text"
          },
          {
            "prop": "items",
            "type": "NavItem[]",
            "default": "[]",
            "desc": "Navigation link items"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Color theme variant"
          }
        ],
        "slotsData": [
          {
            "slot": "brand",
            "bindings": "-",
            "desc": "Custom brand logo or markup"
          },
          {
            "slot": "actions",
            "bindings": "-",
            "desc": "Right-side action buttons"
          }
        ],
        "eventsData": [
          {
            "event": "item-click",
            "payload": "NavItem",
            "desc": "Fired when a nav link is clicked"
          }
        ]
      },
      {
        "id": "CrmlSidebar",
        "name": "CrmlSidebar",
        "category": "Organisms",
        "type": "Sidebar Drawer",
        "desc": "Collapsible sidebar navigation drawer with user profile chip, section headings, and active state pills.",
        "icon": "🗂️",
        "badge": "SIDEBAR",
        "designNotes": "Solid 3px ink border, 4px offset shadow, spring rebound on navigation items.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "'SUITE'",
            "desc": "Sidebar header title"
          },
          {
            "prop": "userHandle",
            "type": "string",
            "default": "'@CRML_PILOT'",
            "desc": "User profile handle"
          },
          {
            "prop": "items",
            "type": "SidebarItem[]",
            "default": "[]",
            "desc": "Menu navigation links"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Active item color variant"
          }
        ],
        "slotsData": [
          {
            "slot": "header",
            "bindings": "-",
            "desc": "Custom header"
          },
          {
            "slot": "footer",
            "bindings": "-",
            "desc": "Custom user profile or bottom actions"
          }
        ],
        "eventsData": [
          {
            "event": "select",
            "payload": "SidebarItem",
            "desc": "Fired on menu item click"
          }
        ]
      },
      {
        "id": "CrmlBreadcrumb",
        "name": "CrmlBreadcrumb",
        "category": "Molecules",
        "type": "Breadcrumb Path",
        "desc": "Multi-tier breadcrumb path links with custom separators and active route pills.",
        "icon": "🛤️",
        "designNotes": "2px solid ink stroke, solid 2px shadow, monospace cyber path styling.",
        "apiData": [
          {
            "prop": "items",
            "type": "BreadcrumbItem[]",
            "default": "[]",
            "desc": "Path hierarchy items"
          },
          {
            "prop": "separator",
            "type": "string",
            "default": "'/'",
            "desc": "Separator glyph"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Active item color"
          }
        ],
        "slotsData": [
          {
            "slot": "separator",
            "bindings": "-",
            "desc": "Custom separator element"
          }
        ],
        "eventsData": [
          {
            "event": "item-click",
            "payload": "BreadcrumbItem",
            "desc": "Fired on breadcrumb link click"
          }
        ]
      },
      {
        "id": "CrmlPagination",
        "name": "CrmlPagination",
        "category": "Molecules",
        "type": "Pagination Bar",
        "desc": "Page pagination bar with prev/next buttons, page number tiles, simple mode, and customizable info templates.",
        "icon": "🔢",
        "designNotes": "Arcade page tiles with 2.5px solid ink borders and 3px drop shadows.",
        "apiData": [
          {
            "prop": "currentPage",
            "type": "number",
            "default": "1",
            "desc": "Active 1-based page number"
          },
          {
            "prop": "totalPages",
            "type": "number",
            "default": "10",
            "desc": "Total page count"
          },
          {
            "prop": "totalItems",
            "type": "number",
            "default": "undefined",
            "desc": "Total items count"
          },
          {
            "prop": "showInfo",
            "type": "boolean",
            "default": "true",
            "desc": "Shows page info caption"
          },
          {
            "prop": "infoTemplate",
            "type": "string",
            "default": "'Page {page} of {pages}'",
            "desc": "Template string with {page}, {pages}, {total} placeholders"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Active page tile color"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Tile size tier"
          },
          {
            "prop": "prevLabel / nextLabel",
            "type": "string",
            "default": "'◄ PREV' / 'NEXT ►'",
            "desc": "Navigation button labels"
          }
        ],
        "slotsData": [
          {
            "slot": "info",
            "bindings": "{ currentPage, totalPages, totalItems }",
            "desc": "Custom page information text"
          }
        ],
        "eventsData": [
          {
            "event": "update:currentPage",
            "payload": "number",
            "desc": "Fired on page selection"
          },
          {
            "event": "page-change",
            "payload": "number",
            "desc": "Fired when page changes"
          }
        ]
      },
      {
        "id": "CrmlStepper",
        "name": "CrmlStepper",
        "category": "Molecules",
        "type": "Workflow Stepper",
        "desc": "Multi-step workflow stepper navigation with horizontal and vertical orientations, completed icons, dashed/dotted connectors, and scoped slots.",
        "icon": "👣",
        "badge": "HORIZONTAL & VERTICAL ✦",
        "designNotes": "Solid 2.5px ink borders, 3px solid black drop shadow, arcade spring rebound on clickable step nodes.",
        "apiData": [
          {
            "prop": "steps",
            "type": "StepItem[]",
            "default": "[]",
            "desc": "List of steps ({ id, label, icon, description, disabled })"
          },
          {
            "prop": "currentStep",
            "type": "number",
            "default": "1",
            "desc": "Active step number (1-based)"
          },
          {
            "prop": "modelValue",
            "type": "number",
            "default": "1",
            "desc": "v-model binding for active step"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'",
            "default": "'pink'",
            "desc": "Active step node theme color"
          },
          {
            "prop": "completedVariant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'",
            "default": "'lime'",
            "desc": "Completed step node theme color"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Step node size tier"
          },
          {
            "prop": "orientation",
            "type": "'horizontal' | 'vertical'",
            "default": "'horizontal'",
            "desc": "Layout alignment direction"
          },
          {
            "prop": "connectorStyle",
            "type": "'solid' | 'dashed' | 'dotted'",
            "default": "'solid'",
            "desc": "Connector line style"
          },
          {
            "prop": "completedIcon",
            "type": "string",
            "default": "'✓'",
            "desc": "Icon glyph displayed on completed steps"
          },
          {
            "prop": "clickable",
            "type": "boolean",
            "default": "true",
            "desc": "Enables clicking step nodes to jump between steps"
          }
        ],
        "slotsData": [
          {
            "slot": "step",
            "bindings": "{ step, index, isActive, isCompleted }",
            "desc": "Full custom step node template"
          },
          {
            "slot": "icon",
            "bindings": "{ step, index, isCompleted }",
            "desc": "Custom step icon or completion badge"
          },
          {
            "slot": "label",
            "bindings": "{ step, index }",
            "desc": "Step title label"
          },
          {
            "slot": "description",
            "bindings": "{ step, index }",
            "desc": "Step explanatory description"
          },
          {
            "slot": "connector",
            "bindings": "{ index, isCompleted }",
            "desc": "Custom connector line between steps"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "number",
            "desc": "Fired when active step changes"
          },
          {
            "event": "update:currentStep",
            "payload": "number",
            "desc": "Fired when active step changes"
          },
          {
            "event": "step-click",
            "payload": "(stepIndex, step)",
            "desc": "Fired on clicking a step node"
          },
          {
            "event": "change",
            "payload": "number",
            "desc": "Fired on step transition"
          }
        ]
      },
      {
        "id": "CrmlPillTabs",
        "name": "CrmlPillTabs",
        "category": "Molecules",
        "type": "Pill Tabs",
        "desc": "Segmented navigation pill tabs with active background fill, size tiers, fullWidth mode, and scoped tab slots.",
        "icon": "🔖",
        "designNotes": "2.5px solid ink border, 3px solid drop shadow, spring rebound on active pill switch.",
        "apiData": [
          {
            "prop": "items",
            "type": "TabItem[]",
            "default": "[]",
            "desc": "List of tab items ({ id, label, icon, badge, disabled })"
          },
          {
            "prop": "modelValue",
            "type": "string",
            "default": "''",
            "desc": "Active tab ID"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'",
            "default": "'lime'",
            "desc": "Active tab color theme"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Tab dimensions"
          },
          {
            "prop": "fullWidth",
            "type": "boolean",
            "default": "false",
            "desc": "Expands tabs to fill parent container width"
          }
        ],
        "slotsData": [
          {
            "slot": "tab",
            "bindings": "{ tab, isActive }",
            "desc": "Custom tab button rendering"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "string",
            "desc": "Fired on tab selection"
          },
          {
            "event": "change",
            "payload": "string",
            "desc": "Fired on tab switch"
          }
        ]
      },
      {
        "id": "CrmlFloatingEmojiBar",
        "name": "CrmlFloatingEmojiBar",
        "category": "Molecules",
        "type": "Reaction Bar",
        "desc": "Floating reaction emoji bar with live click counters, pop animation, and tactile spring buttons.",
        "icon": "😍",
        "designNotes": "Solid 2.5px ink border, 4px solid drop shadow, arcade button bounce.",
        "apiData": [
          {
            "prop": "emojis",
            "type": "Array<{ emoji, count }>",
            "default": "[]",
            "desc": "Reaction emoji list"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Color theme"
          }
        ],
        "slotsData": [
          {
            "slot": "emoji",
            "bindings": "{ item, count }",
            "desc": "Custom emoji pill rendering"
          }
        ],
        "eventsData": [
          {
            "event": "react",
            "payload": "string",
            "desc": "Fired when an emoji reaction is clicked"
          }
        ]
      },
      {
        "id": "CrmlAlert",
        "name": "CrmlAlert",
        "category": "Molecules",
        "type": "Alert Banner",
        "desc": "High-visibility notification banner with icon, dismiss button, and action slot.",
        "icon": "⚠️",
        "designNotes": "Heavy 2.5px solid ink border, 3px solid black drop shadow, high-contrast banner surface.",
        "apiData": [
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'success' | 'danger' | 'warning' | 'info'",
            "default": "'warning'",
            "desc": "Alert theme"
          },
          {
            "prop": "title",
            "type": "string",
            "default": "''",
            "desc": "Alert title"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Alert size"
          },
          {
            "prop": "closable",
            "type": "boolean",
            "default": "true",
            "desc": "Shows dismiss [✕] button"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Alert body text"
          },
          {
            "slot": "icon",
            "bindings": "-",
            "desc": "Custom alert icon"
          },
          {
            "slot": "action",
            "bindings": "-",
            "desc": "Action button or CTA in alert right side"
          }
        ],
        "eventsData": [
          {
            "event": "close",
            "payload": "void",
            "desc": "Fired on alert dismiss"
          }
        ]
      },
      {
        "id": "CrmlToast",
        "name": "CrmlToast",
        "category": "Organisms",
        "type": "Toast Banner",
        "desc": "Floating toast notification banner with close trigger, status badge, and auto-dismiss.",
        "icon": "🍞",
        "designNotes": "3px solid ink border, 4px solid black drop shadow, fixed screen corner positioning.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "''",
            "desc": "Toast title"
          },
          {
            "prop": "message",
            "type": "string",
            "default": "''",
            "desc": "Toast message description"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Toast color"
          },
          {
            "prop": "position",
            "type": "'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'",
            "default": "'top-right'",
            "desc": "Screen placement"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Custom toast message"
          },
          {
            "slot": "action",
            "bindings": "-",
            "desc": "Action button"
          }
        ],
        "eventsData": [
          {
            "event": "close",
            "payload": "void",
            "desc": "Fired on toast close"
          }
        ]
      },
      {
        "id": "CrmlRetroDialog",
        "name": "CrmlRetroDialog",
        "category": "Organisms",
        "type": "Modal Window",
        "desc": "Modal dialog window with OS header bar, window control buttons, and solid backdrop overlay.",
        "icon": "🖥️",
        "designNotes": "Solid 3px ink border, 6px solid black drop shadow (Rule 1 Zero Ambient Blur), retro title bar.",
        "apiData": [
          {
            "prop": "modelValue / open",
            "type": "boolean",
            "default": "false",
            "desc": "Modal visibility state"
          },
          {
            "prop": "title",
            "type": "string",
            "default": "'WINDOW.EXE'",
            "desc": "Title bar text"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'cyan'",
            "desc": "Title bar accent color"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Dialog width tier"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Modal window body content"
          },
          {
            "slot": "titlebar",
            "bindings": "-",
            "desc": "Custom titlebar content"
          },
          {
            "slot": "footer",
            "bindings": "-",
            "desc": "Custom action buttons footer"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "boolean",
            "desc": "Fired on modal close"
          }
        ]
      },
      {
        "id": "CrmlDropdown",
        "name": "CrmlDropdown",
        "category": "Molecules",
        "type": "Dropdown Select",
        "desc": "Tactile dropdown menu with search filter, option descriptions, custom trigger slot, and arcade physics.",
        "icon": "🔽",
        "designNotes": "Solid 2.5px ink borders on trigger and menu, 4px solid drop shadow, zero soft blur.",
        "apiData": [
          {
            "prop": "options",
            "type": "DropdownOption[]",
            "default": "[]",
            "desc": "List of options ({ value, label, icon, description, disabled })"
          },
          {
            "prop": "modelValue",
            "type": "string",
            "default": "''",
            "desc": "Selected option value"
          },
          {
            "prop": "placeholder",
            "type": "string",
            "default": "'Select option...'",
            "desc": "Placeholder text"
          },
          {
            "prop": "label",
            "type": "string",
            "default": "''",
            "desc": "Overhead label text"
          },
          {
            "prop": "searchable",
            "type": "boolean",
            "default": "false",
            "desc": "Enables quick search input within menu"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'white'",
            "default": "'lime'",
            "desc": "Color theme variant"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Trigger size"
          },
          {
            "prop": "disabled",
            "type": "boolean",
            "default": "false",
            "desc": "Disables dropdown"
          }
        ],
        "slotsData": [
          {
            "slot": "trigger",
            "bindings": "{ open, selectedItem, toggle }",
            "desc": "Custom dropdown trigger button"
          },
          {
            "slot": "option",
            "bindings": "{ option, isSelected }",
            "desc": "Custom menu option rendering"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "string",
            "desc": "Fired on option select"
          },
          {
            "event": "change",
            "payload": "DropdownOption",
            "desc": "Fired with selected option object"
          }
        ]
      },
      {
        "id": "CrmlFunkyAccordion",
        "name": "CrmlFunkyAccordion",
        "category": "Organisms",
        "type": "Accordion Panel",
        "desc": "Tactile multi-panel accordion with color rotation sequence, individual item slots, generic scoped slots, and expand/collapse icons.",
        "icon": "🪗",
        "badge": "GENERIC SLOTS ✦",
        "designNotes": "2.5px solid ink borders, 3px solid black offset shadows on items, zero soft blur.",
        "apiData": [
          {
            "prop": "items",
            "type": "AccordionItem[]",
            "default": "[]",
            "desc": "List of accordion items ({ id, title, content, emoji, badge, disabled })"
          },
          {
            "prop": "multiple",
            "type": "boolean",
            "default": "false",
            "desc": "Allows opening multiple panels concurrently"
          },
          {
            "prop": "colorSequence",
            "type": "Array",
            "default": "[\"lavender\", \"peach\", \"mint\", \"yellow\", \"lime\"]",
            "desc": "Color rotation palette"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Accordion item dimensions"
          },
          {
            "prop": "flush",
            "type": "boolean",
            "default": "false",
            "desc": "Flush mode without outer borders and shadows"
          },
          {
            "prop": "expandedIcon / collapsedIcon",
            "type": "string",
            "default": "'⚡' / '➕'",
            "desc": "Icons displayed on panel headers"
          },
          {
            "prop": "defaultExpanded",
            "type": "string[]",
            "default": "[]",
            "desc": "IDs of panels initially expanded"
          }
        ],
        "slotsData": [
          {
            "slot": "header",
            "bindings": "{ item, index }",
            "desc": "Generic header title slot for all accordion items"
          },
          {
            "slot": "header-icon",
            "bindings": "{ item, index }",
            "desc": "Generic header icon slot"
          },
          {
            "slot": "badge",
            "bindings": "{ item, badge }",
            "desc": "Generic item badge slot"
          },
          {
            "slot": "content",
            "bindings": "{ item, index }",
            "desc": "Generic body content slot"
          },
          {
            "slot": "toggle-icon",
            "bindings": "{ expanded, item }",
            "desc": "Custom toggle chevron / icon"
          },
          {
            "slot": "item-[id]",
            "bindings": "{ item }",
            "desc": "Item-specific content slot"
          }
        ],
        "eventsData": [
          {
            "event": "change",
            "payload": "string[]",
            "desc": "Fired when expanded items change, passing array of expanded item IDs"
          }
        ]
      },
      {
        "id": "CrmlHypebeastDropBanner",
        "name": "CrmlHypebeastDropBanner",
        "category": "Organisms",
        "type": "Drop Countdown",
        "desc": "Streetwear drop announcement banner with countdown timer boxes, limited quantity badge, and CTA action.",
        "icon": "👟",
        "designNotes": "Heavy 3px solid ink border, 5px solid black drop shadow, high-contrast streetwear graphics.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "''",
            "desc": "Drop banner headline"
          },
          {
            "prop": "subtitle",
            "type": "string",
            "default": "''",
            "desc": "Drop subtitle description"
          },
          {
            "prop": "badgeText",
            "type": "string",
            "default": "'LIMITED DROP'",
            "desc": "Corner ribbon badge"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Theme color variant"
          }
        ],
        "slotsData": [
          {
            "slot": "action",
            "bindings": "-",
            "desc": "Custom CTA buy or register button"
          }
        ],
        "eventsData": [
          {
            "event": "action",
            "payload": "void",
            "desc": "Fired when action button is clicked"
          }
        ]
      },
      {
        "id": "CrmlNotificationDrawer",
        "name": "CrmlNotificationDrawer",
        "category": "Organisms",
        "type": "Notification Drawer",
        "desc": "Slide-out notification drawer with unread counters, time stamps, and dismiss actions.",
        "icon": "🔔",
        "designNotes": "Solid 3px ink stroke, 5px solid black drop shadow, sliding spring transition.",
        "apiData": [
          {
            "prop": "modelValue",
            "type": "boolean",
            "default": "false",
            "desc": "Drawer open visibility state"
          },
          {
            "prop": "notifications",
            "type": "NotificationItem[]",
            "default": "[]",
            "desc": "List of notifications"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'pink'",
            "desc": "Theme color"
          }
        ],
        "slotsData": [
          {
            "slot": "header",
            "bindings": "-",
            "desc": "Custom header"
          },
          {
            "slot": "item",
            "bindings": "{ item }",
            "desc": "Custom notification item rendering"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "boolean",
            "desc": "Fired on drawer toggle"
          }
        ]
      },
      {
        "id": "CrmlCommandPalette",
        "name": "CrmlCommandPalette",
        "category": "Organisms",
        "type": "Command Palette",
        "desc": "Keyboard-driven command menu [⌘K] with fuzzy search, action shortcuts, and category groupings.",
        "icon": "⌨️",
        "designNotes": "Zero ambient blur, 3px solid ink stroke, 6px solid black drop shadow.",
        "apiData": [
          {
            "prop": "modelValue",
            "type": "boolean",
            "default": "false",
            "desc": "Palette visibility state"
          },
          {
            "prop": "commands",
            "type": "CommandItem[]",
            "default": "[]",
            "desc": "List of searchable actions"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'cyan'",
            "desc": "Selection highlight color"
          }
        ],
        "slotsData": [
          {
            "slot": "item",
            "bindings": "{ command }",
            "desc": "Custom command item row"
          }
        ],
        "eventsData": [
          {
            "event": "select",
            "payload": "CommandItem",
            "desc": "Fired when a command is executed"
          }
        ]
      },
      {
        "id": "CrmlFilterDrawer",
        "name": "CrmlFilterDrawer",
        "category": "Organisms",
        "type": "Filter Drawer",
        "desc": "Slide-out filter drawer panel with range sliders, tags, checkboxes, and apply/reset buttons.",
        "icon": "🗄️",
        "designNotes": "3px solid ink stroke, 5px solid shadow, zero soft blur.",
        "apiData": [
          {
            "prop": "modelValue",
            "type": "boolean",
            "default": "false",
            "desc": "Drawer visibility state"
          },
          {
            "prop": "title",
            "type": "string",
            "default": "'ADVANCED FILTERS'",
            "desc": "Drawer title header"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Theme color"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Custom filter form fields"
          },
          {
            "slot": "footer",
            "bindings": "{ apply, reset }",
            "desc": "Custom footer action buttons"
          }
        ],
        "eventsData": [
          {
            "event": "apply",
            "payload": "void",
            "desc": "Fired on Apply Filters button click"
          },
          {
            "event": "reset",
            "payload": "void",
            "desc": "Fired on Reset button click"
          }
        ]
      }
    ]
  },
  {
    "name": "DATA & TELEMETRY GADGETS",
    "items": [
      {
        "id": "CrmlTable",
        "name": "CrmlTable",
        "category": "Organisms",
        "type": "Data Table",
        "desc": "Dense data table with sort indicators, row numbers, empty states, loading indicators, and per-column scoped cell slots.",
        "icon": "📊",
        "badge": "DATA GRID ✦",
        "designNotes": "Solid 3px Obsidian Black frame, 1.5px internal row borders, zero soft shadow blur. Hover highlights rows.",
        "apiData": [
          {
            "prop": "columns",
            "type": "Column[]",
            "default": "[]",
            "desc": "Column specifications ({ key, label, align, sortable, width })"
          },
          {
            "prop": "data",
            "type": "Record<string, any>[]",
            "default": "[]",
            "desc": "Dataset array of row objects"
          },
          {
            "prop": "striped",
            "type": "boolean",
            "default": "true",
            "desc": "Alternating zebra row backgrounds"
          },
          {
            "prop": "hoverable",
            "type": "boolean",
            "default": "true",
            "desc": "Highlights row on hover"
          },
          {
            "prop": "accentColor",
            "type": "'yellow' | 'pink' | 'cyan' | 'lime' | 'violet'",
            "default": "'yellow'",
            "desc": "Header and accent color variant"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Table density padding"
          },
          {
            "prop": "bordered",
            "type": "boolean",
            "default": "true",
            "desc": "Renders outer 3px solid ink border"
          },
          {
            "prop": "caption",
            "type": "string",
            "default": "''",
            "desc": "Table caption description"
          },
          {
            "prop": "emptyText",
            "type": "string",
            "default": "'No data found'",
            "desc": "Text shown when data is empty"
          },
          {
            "prop": "emptyIcon",
            "type": "string",
            "default": "'📭'",
            "desc": "Icon shown in empty state"
          },
          {
            "prop": "showRowNumbers",
            "type": "boolean",
            "default": "false",
            "desc": "Displays 1-indexed row number column"
          },
          {
            "prop": "rowNumberLabel",
            "type": "string",
            "default": "'#'",
            "desc": "Header text for row numbers"
          },
          {
            "prop": "loading",
            "type": "boolean",
            "default": "false",
            "desc": "Shows loading spinner row"
          },
          {
            "prop": "maxHeight",
            "type": "string",
            "default": "undefined",
            "desc": "CSS max-height for vertically scrollable tables"
          }
        ],
        "slotsData": [
          {
            "slot": "header-[key]",
            "bindings": "{ column }",
            "desc": "Custom header cell rendering for specific column key"
          },
          {
            "slot": "cell-[key]",
            "bindings": "{ row, value, index }",
            "desc": "Custom data cell rendering for specific column key"
          },
          {
            "slot": "empty",
            "bindings": "-",
            "desc": "Custom empty state message and graphic"
          },
          {
            "slot": "loading",
            "bindings": "-",
            "desc": "Custom loading state indicator"
          },
          {
            "slot": "footer",
            "bindings": "-",
            "desc": "Custom table footer summary row"
          }
        ],
        "eventsData": [
          {
            "event": "row-click",
            "payload": "(row, index)",
            "desc": "Fired when any data row is clicked"
          },
          {
            "event": "header-click",
            "payload": "(column)",
            "desc": "Fired when a column header is clicked"
          }
        ]
      },
      {
        "id": "CrmlPriceTagWidget",
        "name": "CrmlPriceTagWidget",
        "category": "Organisms",
        "type": "KPI Stat Card",
        "desc": "E-commerce and drop banner KPI widget displaying big currency numerals, customizable suffix text, stock progress meter, and CTA button.",
        "icon": "📈",
        "badge": "STOCK & FORMATTER ✦",
        "designNotes": "3px solid ink border (#0D0D0D), 4px solid black drop shadow, brand progress bar fill, and tactile buy button.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "'SPECIAL EDITION ZINE ISSUE #03'",
            "desc": "Item or KPI title"
          },
          {
            "prop": "price",
            "type": "string | number",
            "default": "'128.40'",
            "desc": "Price amount (number or string)"
          },
          {
            "prop": "priceFormatter",
            "type": "(val) => string",
            "default": "undefined",
            "desc": "Custom price formatting function"
          },
          {
            "prop": "currency",
            "type": "string",
            "default": "'$'",
            "desc": "Currency symbol"
          },
          {
            "prop": "priceSuffix",
            "type": "string",
            "default": "'/ COPY'",
            "desc": "Price suffix text (e.g. / COPY, / MO)"
          },
          {
            "prop": "badgeText",
            "type": "string",
            "default": "'LIMITED DROP'",
            "desc": "Header badge label"
          },
          {
            "prop": "stockCurrent / stockTotal",
            "type": "number",
            "default": "42 / 100",
            "desc": "Stock inventory counts"
          },
          {
            "prop": "stockLabel",
            "type": "string",
            "default": "'STOCK AVAILABILITY'",
            "desc": "Stock section title"
          },
          {
            "prop": "stockUnit",
            "type": "string",
            "default": "'LEFT'",
            "desc": "Stock remaining unit text"
          },
          {
            "prop": "buttonText",
            "type": "string",
            "default": "'GET IT NOW ⚡'",
            "desc": "CTA button text"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Theme color variant"
          },
          {
            "prop": "showStock",
            "type": "boolean",
            "default": "true",
            "desc": "Shows or hides stock progress indicator"
          }
        ],
        "slotsData": [
          {
            "slot": "title",
            "bindings": "-",
            "desc": "Custom title"
          },
          {
            "slot": "badge",
            "bindings": "-",
            "desc": "Custom status or limited drop badge"
          },
          {
            "slot": "price",
            "bindings": "{ price, rawPrice, currency }",
            "desc": "Custom big price readout"
          },
          {
            "slot": "extra",
            "bindings": "-",
            "desc": "Custom slot for product specs or vouchers"
          },
          {
            "slot": "button",
            "bindings": "-",
            "desc": "Custom CTA buy button text/element"
          }
        ],
        "eventsData": [
          {
            "event": "buy",
            "payload": "void",
            "desc": "Fired when CTA button is clicked"
          }
        ]
      },
      {
        "id": "CrmlSpeedometerDial",
        "name": "CrmlSpeedometerDial",
        "category": "Organisms",
        "type": "Gauge Dial",
        "desc": "Mechanical telemetry dial with rotary physical needle, SVG arc track, digital numeric readout, customizable min/max range, and selectable engine modes.",
        "icon": "⚡",
        "badge": "DYNAMIC MODES ✦",
        "designNotes": "Heavy 3px ink border, 4px solid shadow, zero blur, high-contrast digital hub with Obsidian Black background.",
        "apiData": [
          {
            "prop": "modelValue / value",
            "type": "number",
            "default": "78",
            "desc": "Gauge capacity value binding"
          },
          {
            "prop": "min / max",
            "type": "number",
            "default": "0 / 100",
            "desc": "Lower and upper capacity boundaries"
          },
          {
            "prop": "title",
            "type": "string",
            "default": "'TURBO ENGINE RPM'",
            "desc": "Dial title"
          },
          {
            "prop": "unit",
            "type": "string",
            "default": "'% CAP'",
            "desc": "Unit badge"
          },
          {
            "prop": "sublabel",
            "type": "string",
            "default": "'RPM x100'",
            "desc": "Subtext below digital number"
          },
          {
            "prop": "modes",
            "type": "Array<string | SpeedometerMode>",
            "default": "[\"ECO\", \"NORMAL\", \"SPORT\", \"TURBO\"]",
            "desc": "Selectable engine mode pills"
          },
          {
            "prop": "formatter",
            "type": "(val: number) => string",
            "default": "undefined",
            "desc": "Custom digital readout formatting function"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Progress track color theme"
          },
          {
            "prop": "showModes",
            "type": "boolean",
            "default": "true",
            "desc": "Displays mode selector pill buttons"
          }
        ],
        "slotsData": [
          {
            "slot": "title",
            "bindings": "{ title }",
            "desc": "Custom dial title bar"
          },
          {
            "slot": "unit",
            "bindings": "{ unit }",
            "desc": "Custom unit badge"
          },
          {
            "slot": "readout",
            "bindings": "{ value, formatted }",
            "desc": "Custom digital number readout"
          },
          {
            "slot": "sublabel",
            "bindings": "{ sublabel }",
            "desc": "Custom subtext below readout"
          },
          {
            "slot": "modes",
            "bindings": "{ modes, activeMode, select }",
            "desc": "Custom modes bar container"
          },
          {
            "slot": "mode",
            "bindings": "{ mode, active }",
            "desc": "Custom individual mode button"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "number",
            "desc": "Fired when needle position or mode changes"
          },
          {
            "event": "change",
            "payload": "number",
            "desc": "Fired on value change"
          },
          {
            "event": "mode-select",
            "payload": "SpeedometerMode",
            "desc": "Fired when a mode pill is selected"
          }
        ]
      },
      {
        "id": "CrmlRadarTelemetry",
        "name": "CrmlRadarTelemetry",
        "category": "Organisms",
        "type": "Radar HUD",
        "desc": "Tactile radar HUD gauge with rotating vector sweep line, blip targets, sector grid coordinates, and live telemetry card.",
        "icon": "📡",
        "badge": "HUD",
        "designNotes": "Zero ambient blur, 3px solid ink border, high-contrast green/cyan blip pings with Obsidian Black background.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "'TACTILE RADAR HUD v2.4'",
            "desc": "HUD header title"
          },
          {
            "prop": "targets",
            "type": "RadarTarget[]",
            "default": "[]",
            "desc": "List of targets ({ id, label, x, y, status, sector, distance })"
          },
          {
            "prop": "sweepSpeed",
            "type": "number",
            "default": "3",
            "desc": "Rotational sweep animation degrees per frame"
          },
          {
            "prop": "modelValue",
            "type": "string",
            "default": "undefined",
            "desc": "Active selected target ID binding"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'cyan'",
            "desc": "HUD accent color variant"
          }
        ],
        "slotsData": [
          {
            "slot": "header",
            "bindings": "{ title, activeTarget }",
            "desc": "Custom HUD header bar"
          },
          {
            "slot": "target-blip",
            "bindings": "{ target, isSelected }",
            "desc": "Custom blip ping and label"
          },
          {
            "slot": "footer",
            "bindings": "{ activeTarget }",
            "desc": "Custom bottom telemetry data card"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "string",
            "desc": "Fired when a target is clicked/selected"
          },
          {
            "event": "target-select",
            "payload": "RadarTarget",
            "desc": "Fired with the selected target data object"
          }
        ]
      },
      {
        "id": "CrmlSoundboard",
        "name": "CrmlSoundboard",
        "category": "Organisms",
        "type": "MPC Soundboard",
        "desc": "Interactive MPC soundboard matrix with customizable pads array, BPM control, LCD display, and trigger callbacks.",
        "icon": "🎛️",
        "badge": "CUSTOM PADS ✦",
        "designNotes": "Obsidian Black LCD header, 3px solid ink frame, mechanical trigger spring animation on active pads.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "'CRML-808 SOUNDBOARD'",
            "desc": "Soundboard LCD title"
          },
          {
            "prop": "bpm",
            "type": "number",
            "default": "128",
            "desc": "Beats per minute counter"
          },
          {
            "prop": "pads",
            "type": "SoundPad[]",
            "default": "[]",
            "desc": "Array of sound pads ({ id, label, key, color, variant, sound, icon })"
          },
          {
            "prop": "modelValue",
            "type": "boolean",
            "default": "false",
            "desc": "Playback isPlaying state"
          },
          {
            "prop": "columns",
            "type": "number",
            "default": "4",
            "desc": "Number of MPC grid columns"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Theme color variant"
          }
        ],
        "slotsData": [
          {
            "slot": "title",
            "bindings": "{ title }",
            "desc": "Custom LCD title"
          },
          {
            "slot": "status",
            "bindings": "{ isPlaying }",
            "desc": "Custom playback status indicator"
          },
          {
            "slot": "controls",
            "bindings": "{ bpm, isPlaying, togglePlay }",
            "desc": "Custom BPM / Play controls"
          },
          {
            "slot": "pad",
            "bindings": "{ pad, isActive }",
            "desc": "Custom MPC pad button template"
          },
          {
            "slot": "footer",
            "bindings": "-",
            "desc": "Custom soundboard footer controls"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "boolean",
            "desc": "Fired on play/pause toggle"
          },
          {
            "event": "update:bpm",
            "payload": "number",
            "desc": "Fired when BPM input changes"
          },
          {
            "event": "pad-trigger",
            "payload": "SoundPad",
            "desc": "Fired when any sound pad is triggered"
          },
          {
            "event": "play-toggle",
            "payload": "boolean",
            "desc": "Fired on play state change"
          }
        ]
      },
      {
        "id": "CrmlStatusMatrix",
        "name": "CrmlStatusMatrix",
        "category": "Molecules",
        "type": "Status Matrix",
        "desc": "Cyber telemetry grid displaying system metrics, status lights, custom column counts, and interactive clickable states.",
        "icon": "🟩",
        "badge": "GRID METRICS ✦",
        "designNotes": "2px solid ink stroke, 2.5px solid offset shadow, brand token status backgrounds (lime, cyan, yellow, pink).",
        "apiData": [
          {
            "prop": "items",
            "type": "StatusBadgeItem[]",
            "default": "[]",
            "desc": "List of status items ({ id, label, status, value, icon })"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Status chip size tier"
          },
          {
            "prop": "columns",
            "type": "number | string",
            "default": "undefined",
            "desc": "Custom grid columns count or CSS template"
          },
          {
            "prop": "clickable",
            "type": "boolean",
            "default": "false",
            "desc": "Enables click interactions and hover effects"
          }
        ],
        "slotsData": [
          {
            "slot": "item",
            "bindings": "{ item, index }",
            "desc": "Full custom chip template"
          },
          {
            "slot": "icon",
            "bindings": "{ item, index }",
            "desc": "Custom status light or icon"
          },
          {
            "slot": "label",
            "bindings": "{ item, index }",
            "desc": "Status title label"
          },
          {
            "slot": "value",
            "bindings": "{ item, index }",
            "desc": "Status metric readout (e.g. 99.9%, 24ms)"
          }
        ],
        "eventsData": [
          {
            "event": "click-item",
            "payload": "(item, index)",
            "desc": "Fired when a status chip is clicked"
          }
        ]
      },
      {
        "id": "CrmlCodeBlock",
        "name": "CrmlCodeBlock",
        "category": "Molecules",
        "type": "Code Box",
        "desc": "Terminal code container with syntax highlight, title header bar, line numbers, and one-click copy button.",
        "icon": "💻",
        "designNotes": "3px solid ink border with 3px solid black shadow, retro macOS window control dots.",
        "apiData": [
          {
            "prop": "code",
            "type": "string",
            "default": "''",
            "desc": "Code snippet string"
          },
          {
            "prop": "title",
            "type": "string",
            "default": "'script.ts'",
            "desc": "Window title bar text"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'cyan'",
            "desc": "Window dot accent color"
          }
        ],
        "slotsData": [
          {
            "slot": "header",
            "bindings": "-",
            "desc": "Custom window titlebar"
          }
        ],
        "eventsData": [
          {
            "event": "copy",
            "payload": "string",
            "desc": "Fired when code is copied to clipboard"
          }
        ]
      },
      {
        "id": "CrmlTimeline",
        "name": "CrmlTimeline",
        "category": "Organisms",
        "type": "Activity Stream",
        "desc": "Activity timeline stream with connector line styles (solid/dashed/dotted), badges, node colors, and scoped item slots.",
        "icon": "⏳",
        "designNotes": "3px solid ink nodes with 2.5px solid black drop shadow. Connectors rendered with solid or dashed ink stroke.",
        "apiData": [
          {
            "prop": "items",
            "type": "TimelineItem[]",
            "default": "[]",
            "desc": "Array of timeline items ({ id, title, date, description, badgeText, badgeVariant, icon, color })"
          },
          {
            "prop": "accentColor",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'",
            "default": "'lime'",
            "desc": "Overall timeline accent theme"
          },
          {
            "prop": "connectorStyle",
            "type": "'solid' | 'dashed' | 'dotted'",
            "default": "'solid'",
            "desc": "Style of connector lines between steps"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Timeline node size dimension"
          },
          {
            "prop": "dense",
            "type": "boolean",
            "default": "false",
            "desc": "Compact dense mode with tighter spacing"
          }
        ],
        "slotsData": [
          {
            "slot": "icon",
            "bindings": "{ item, index }",
            "desc": "Custom node bullet icon"
          },
          {
            "slot": "content",
            "bindings": "{ item, index }",
            "desc": "Full custom step body"
          },
          {
            "slot": "title",
            "bindings": "{ item, index }",
            "desc": "Step title"
          },
          {
            "slot": "date",
            "bindings": "{ item, index }",
            "desc": "Step date/time chip"
          },
          {
            "slot": "badge",
            "bindings": "{ item, index }",
            "desc": "Step status badge"
          },
          {
            "slot": "description",
            "bindings": "{ item, index }",
            "desc": "Step description text"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlVideoPlayer",
        "name": "CrmlVideoPlayer",
        "category": "Organisms",
        "type": "Video Frame",
        "desc": "Lo-fi retro video player frame with playback controls, title header bar, and time indicator.",
        "icon": "🎬",
        "designNotes": "Solid 3px ink border, 5px solid shadow, retro CRT glass reflection decals.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "'CYBER_STREAM.MP4'",
            "desc": "Video title"
          },
          {
            "prop": "src",
            "type": "string",
            "default": "''",
            "desc": "Video file source URL"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Player control accent"
          }
        ],
        "slotsData": [
          {
            "slot": "controls",
            "bindings": "-",
            "desc": "Custom playback buttons"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlEmojiRatingSlider",
        "name": "CrmlEmojiRatingSlider",
        "category": "Molecules",
        "type": "Rating Slider",
        "desc": "Interactive rating slider with expressive morphing emojis (😡 😐 🙂 😃 🤩) and step labels.",
        "icon": "⭐",
        "designNotes": "Solid ink border 2.5px, 3px solid black drop shadow.",
        "apiData": [
          {
            "prop": "modelValue",
            "type": "number",
            "default": "4",
            "desc": "Current rating index (1 to 5)"
          },
          {
            "prop": "label",
            "type": "string",
            "default": "'RATING'",
            "desc": "Slider label"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'yellow'",
            "desc": "Track color"
          }
        ],
        "slotsData": [
          {
            "slot": "label",
            "bindings": "-",
            "desc": "Custom header label"
          }
        ],
        "eventsData": [
          {
            "event": "update:modelValue",
            "payload": "number",
            "desc": "Fired when rating updates"
          }
        ]
      },
      {
        "id": "CrmlVaporwaveVisualizer",
        "name": "CrmlVaporwaveVisualizer",
        "category": "Molecules",
        "type": "Audio Visualizer",
        "desc": "Real-time animated audio EQ spectrum bars visualizer with Y2K cyber color gradients.",
        "icon": "🎚️",
        "designNotes": "Zero ambient blur. Stepped solid color blocks with solid black outline borders.",
        "apiData": [
          {
            "prop": "title",
            "type": "string",
            "default": "'SPECTRUM EQ'",
            "desc": "Visualizer title"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'cyan'",
            "desc": "Bar peak color"
          }
        ],
        "slotsData": [
          {
            "slot": "header",
            "bindings": "-",
            "desc": "Custom header section"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlProgress",
        "name": "CrmlProgress",
        "category": "Atoms",
        "type": "Progress Bar",
        "desc": "High-contrast progress meter bar with stepped stripes, percentage readout pill, and brand fill.",
        "icon": "📈",
        "designNotes": "2.5px solid ink border with 2px solid drop shadow.",
        "apiData": [
          {
            "prop": "value",
            "type": "number",
            "default": "78",
            "desc": "Progress percentage (0-100)"
          },
          {
            "prop": "max",
            "type": "number",
            "default": "100",
            "desc": "Maximum progress limit"
          },
          {
            "prop": "showValue",
            "type": "boolean",
            "default": "true",
            "desc": "Shows numerical value chip"
          },
          {
            "prop": "variant",
            "type": "'lime' | 'pink' | 'cyan' | 'yellow'",
            "default": "'lime'",
            "desc": "Fill color variant"
          }
        ],
        "slotsData": [
          {
            "slot": "value",
            "bindings": "{ value }",
            "desc": "Custom value readout pill"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlKbd",
        "name": "CrmlKbd",
        "category": "Atoms",
        "type": "Keycap Badge",
        "desc": "Mechanical keyboard keycap chip with 3D physical key elevation and pressed state.",
        "icon": "⌨️",
        "designNotes": "2px solid ink stroke, 2px solid black bottom extrusion elevation.",
        "apiData": [
          {
            "prop": "shortcut",
            "type": "string",
            "default": "'⌘K'",
            "desc": "Key combination string"
          },
          {
            "prop": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "desc": "Keycap size"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Custom key glyph"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlSkeleton",
        "name": "CrmlSkeleton",
        "category": "Atoms",
        "type": "Skeleton Loader",
        "desc": "Tactile loading skeleton placeholder with hatched zebra pattern and solid ink border.",
        "icon": "🦴",
        "designNotes": "Solid 2px ink border, hatched diagonal 45deg stripe animation with zero blur.",
        "apiData": [
          {
            "prop": "width",
            "type": "string",
            "default": "'100%'",
            "desc": "CSS width"
          },
          {
            "prop": "height",
            "type": "string",
            "default": "'20px'",
            "desc": "CSS height"
          },
          {
            "prop": "circle",
            "type": "boolean",
            "default": "false",
            "desc": "Circular shape"
          }
        ],
        "slotsData": [],
        "eventsData": []
      },
      {
        "id": "CrmlTooltip",
        "name": "CrmlTooltip",
        "category": "Atoms",
        "type": "Tactile Tooltip",
        "desc": "Hover tooltip popup bubble with solid ink drop shadow and pointer chevron.",
        "icon": "💡",
        "designNotes": "Solid 2px ink border, 3px solid black offset shadow, zero soft drop blur.",
        "apiData": [
          {
            "prop": "text",
            "type": "string",
            "default": "''",
            "desc": "Tooltip message text"
          },
          {
            "prop": "position",
            "type": "'top' | 'bottom' | 'left' | 'right'",
            "default": "'top'",
            "desc": "Placement direction"
          }
        ],
        "slotsData": [
          {
            "slot": "default",
            "bindings": "-",
            "desc": "Trigger anchor element"
          },
          {
            "slot": "content",
            "bindings": "-",
            "desc": "Custom rich tooltip content"
          }
        ],
        "eventsData": []
      },
      {
        "id": "CrmlWavyDivider",
        "name": "CrmlWavyDivider",
        "category": "Atoms",
        "type": "Wavy Divider",
        "desc": "SVG wavy and zigzag divider rule with solid ink strokes and customizable stroke widths.",
        "icon": "〰️",
        "designNotes": "SVG stroke paths with zero blur and solid brand token stroke colors.",
        "apiData": [
          {
            "prop": "styleType",
            "type": "'wave' | 'zigzag'",
            "default": "'wave'",
            "desc": "Divider wave geometry"
          },
          {
            "prop": "color",
            "type": "string",
            "default": "'#CCFF00'",
            "desc": "Stroke color"
          },
          {
            "prop": "strokeWidth",
            "type": "number",
            "default": "4",
            "desc": "Stroke thickness in px"
          }
        ],
        "slotsData": [],
        "eventsData": []
      }
    ]
  }
]
