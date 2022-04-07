Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  data: {
    className: '',
  },
  properties: {
    customClass: {
      type: String,
      value: '',
    },
    customStyle: {
      type: String,
      value: '',
    },
  },
})
