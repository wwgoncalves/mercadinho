const path = require("path");
const protobuf = require("protobufjs");
const protoLoader = require("@grpc/proto-loader");

const protoFile = path.resolve(__dirname, "../../../../proto/products.proto");

const protoObject = protoLoader.loadSync(protoFile);
const Product = protobuf.loadSync(protoFile).lookupType("Product");

module.exports = { protoObject, Product };
