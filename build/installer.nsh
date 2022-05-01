; !define HKCU_PATH "Software\electron-vue"

; Function .onInit
; ReadRegDWORD  $0 HKCU ${HKCU_PATH} "installed"

; IntCmp $0 +1 +4
; MessageBox MB_YESNO  "$(^Name) 已安装在计算机中。是否覆盖安装？"  IDYES +3
; Quit 
; nop
; FunctionEnd

; Section -Post
;   WriteRegStr HKCU ${HKCU_PATH} "installPath" $INSTDIR 
; SectionEnd

; DeleteRegKey /ifempty HKCU ${HKCU_PATH}