#项目要求的最低cmake版本
cmake_minimum_required(VERSION 3.10)

#项目名称和版本号
project(Tutorial VERSION 1.3)

# 选项 ON / OFF
option(USE_MYMATH "Use tutorial provided math implementation" ON)

# 配置头文件，将版本号/或变量传到源代码，TutorialConfig.h.in需要自己编写
configure_file(TutorialConfig.h.in TutorialConfig.h)

# 指定c++标准
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)


if(USE_MYMATH) 
	# 添加子目录
	add_subdirectory(MathFunctions)
	# list添加值（该变量用以后面target_link_libraries）
	list(APPEND EXTRA_LIBS MathFunctions)
	# list添加值 (该变量用以后面target_include_directories)
	list(APPEND EXTRA_INCLUDES "${PROJECT_SOURCE_DIR}/MathFunctions")
endif()

# 检查系统是否支持 pow 函数
include (CheckFunctionExists)
check_function_exists (log HAVE_LOG)
check_function_exists (exp HAVE_EXP)


#添加可执行文件名称，cmake之后执行make
# add_executable(<name> [WIN32] [MACOSX_BUNDLE] [EXCLUDE_FROM_ALL] [source1] [source2 ...])
add_executable(Tutorial tutorial.cxx)


# 添加链接库文件
target_link_libraries(Tutorial PUBLIC ${EXTRA_LIBS})

#指定目标包含的头文件路径
target_include_directories(Tutorial PUBLIC "${PROJECT_BINARY_DIR}" ${EXTRA_INCLUDES} PRIVATE ${CMAKE_CURRENT_BINARY_DIR})

# 安装 cmake之后执行make install
# 安装可执行文件，目录为/usr/local/bin（如果为lib则为安装静态库，目录为/usr/local/lib
install(TARGETS Tutorial DESTINATION bin)
# 安装配置文件或头文件，目录为/usr/local/include
install(FILES "${PROJECT_BINARY_DIR}/TutorialConfig.h"
  DESTINATION include
  )

# 以下为测试部分 make test执行
enable_testing()
# 测试能否正常运行 并返回0
add_test(NAME Runs COMMAND Tutorial 25)
# 测试能否返回预期值
add_test(NAME Usage COMMAND Tutorial)
set_tests_properties(Usage
  PROPERTIES PASS_REGULAR_EXPRESSION "Usage:.*number"
  )
# 定义简单的测试函数
function(do_test target arg result)
  add_test(NAME Comp${arg} COMMAND ${target} ${arg})
  set_tests_properties(Comp${arg}
    PROPERTIES PASS_REGULAR_EXPRESSION ${result}
    )
endfunction(do_test)
# 进行7条测试
do_test(Tutorial 4 "4 is 2")
do_test(Tutorial 9 "9 is 3")
do_test(Tutorial 5 "5 is 2.236")
do_test(Tutorial 7 "7 is 2.645")
do_test(Tutorial 25 "25 is 5")
do_test(Tutorial -25 "-25 is [-nan|nan|0]")
do_test(Tutorial 0.0001 "0.0001 is 0.01")

# 使用cpack生成安装包（执行命令cpack 二进制版本 cpack --config CPackSourceConfig.cmake源码版本）
include(InstallRequiredSystemLibraries)
#set(CPACK_RESOURCE_FILE_LICENSE "${CMAKE_CURRENT_SOURCE_DIR}/License.txt")
set(CPACK_PACKAGE_VERSION_MAJOR "${Tutorial_VERSION_MAJOR}")
set(CPACK_PACKAGE_VERSION_MINOR "${Tutorial_VERSION_MINOR}")
include(CPack)