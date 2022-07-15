let tableData = [
  {
    id: 1,
    russia: '34.5',
    greatBritian: '3.5',
    europe: '36',
    footLength: '23'
  },
  {
    id: 2,
    russia: '35.5',
    greatBritian: '4',
    europe: '36.⅔',
    footLength: '23–23,5'
  },
  {
    id: 3,
    russia: '36',
    greatBritian: '4.5',
    europe: '37⅓',
    footLength: '23.5'
  },
  {
    id: 4,
    russia: '36.5',
    greatBritian: '5',
    europe: '38',
    footLength: '24'
  },
]

export const getAll = (req, res) => {
  res.status(200).json(tableData)
}