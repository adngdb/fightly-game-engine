BUILD_DIR=./build
COMPILER=$(BUILD_DIR)/r.js

all:
	node $(COMPILER) -o $(BUILD_DIR)/build.js

tests:
	./node_modules/mocha/bin/mocha ./test

clean:
	rm fightly.js
