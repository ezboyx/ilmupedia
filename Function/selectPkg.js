const informasiPaket = [
    { packageName: '1 GB Ilmupedia 1 hari', id: '1068', derived_id: '8100', purchase_mode: 'onetime', channel: 'desktop|index'},
    { packageName:'5 GB Ilmupedia 3 hari', id: '1070', derived_id: '8196', purchase_mode: 'onetime', channel: 'desktop|index'},
    { packageName:'10 GB Ilmupedia 1 hari' ,id: '1056', derived_id: '7524', purchase_mode: 'onetime', channel: 'desktop|index'},
    { packageName:'11 GB Ilmupedia 3 hari' ,id: '1057', derived_id: '7620', purchase_mode: 'onetime', channel: 'desktop|index'},
    { packageName:'11 GB Ilmupedia 7 hari' ,id: '1058', derived_id: '7812', purchase_mode: 'onetime', channel: 'desktop|index'},
    { packageName:'17 GB Ilmupedia 3 hari' ,id: '1062', derived_id: '7716', purchase_mode: 'onetime', channel: 'desktop|index'},
    { packageName:'17 GB Ilmupedia 7 hari' ,id: '1063', derived_id: '7908', purchase_mode: 'onetime', channel: 'desktop|index'},
    { packageName:'28 GB Ilmupedia 7 hari' ,id: '1066', derived_id: '8004', purchase_mode: 'onetime', channel: 'desktop|index'}
]

async function selectPkg(id) {
    const selectedPkg = informasiPaket.find(pkg => pkg.id === id)
    return selectedPkg
}

module.exports = selectPkg